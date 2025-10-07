const { loadData } = require('./../lib/load-data');
const cli = require('./../lib/cli-common');
const colors = require('colors');
const fs = require('fs');
const { finished } = require('stream/promises');

function checkArguments(cliArgs) {
  if (cliArgs.paths == null) {
    console.warn(colors.red.bold('Please specify input files (-p flag)'));
    return false;
  }

  if (cliArgs.output == null) {
    console.warn(colors.yellow.bold('No output file specified (-o flag).'));
    console.warn(colors.yellow.bold('Using csv-to-json-output.json'));
    cliArgs.output = 'csv-to-json-output.json';
  }

  return true;
}

function write(stream, chunk) {
  if (stream.write(chunk)) return Promise.resolve();
  return new Promise((resolve) => stream.once('drain', resolve));
}

async function writeJson(stream, value) {
  if (value === null) { await write(stream, 'null'); return; }
  const t = typeof value;

  if (t === 'number' || t === 'boolean' || t === 'string') {
    await write(stream, JSON.stringify(value));
    return;
  }

  if (Array.isArray(value)) {
    await write(stream, '[');
    for (let i = 0; i < value.length; i++) {
      if (i > 0) await write(stream, ',');
      await writeJson(stream, value[i]);
    }
    await write(stream, ']');
    return;
  }

  if (t === 'object') {
    const keys = Object.keys(value);
    await write(stream, '{');
    for (let i = 0; i < keys.length; i++) {
      if (i > 0) await write(stream, ',');
      const k = keys[i];
      await write(stream, JSON.stringify(k) + ':');
      await writeJson(stream, value[k]);
    }
    await write(stream, '}');
    return;
  }

  await write(stream, 'null');
}

async function main(cliArgs) {
  console.log(cliArgs.paths);
  if (!checkArguments(cliArgs)) return;

  const inputJson = loadData(cliArgs.paths);

  const stream = fs.createWriteStream(cliArgs.output, { encoding: 'utf8' });
  await writeJson(stream, inputJson);
  stream.end();
  await finished(stream);
}

main(cli.getParameters()).catch((err) => {
  console.error(err);
  process.exit(1);
});

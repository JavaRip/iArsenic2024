import { BigQuery } from "@google-cloud/bigquery";
import fs from "fs";
import path from "path";

const bigquery = new BigQuery({
    projectId: "iarsenic-staging",
});


const DATASET_ID = "default"; // ← Change this
const EXPORTS_DIR = "./firestore-export";
// const COLLECTIONS = ["apiKey", "migration", "token", "user", "well"];
const COLLECTIONS = ["well"];

import { TableMetadata } from "@google-cloud/bigquery";

function defineWellTableSchema(): TableMetadata["schema"] {
    return {
        fields: [
            { name: "id", type: "STRING" },
            { name: "userId", type: "STRING" },
            { name: "complete", type: "BOOLEAN" },
            { name: "createdAt", type: "TIMESTAMP" },
            { name: "depth", type: "FLOAT" },
            { name: "division", type: "STRING" },
            { name: "district", type: "STRING" },
            { name: "upazila", type: "STRING" },
            { name: "union", type: "STRING" },
            { name: "mouza", type: "STRING" },
            { name: "geolocated", type: "BOOLEAN" },
            { name: "geolocation", type: "STRING" }, // [lat, lng] tuple — serialized
            { name: "mouzaGeolocation", type: "STRING" }, // [lat, lng] tuple — serialized
            { name: "hasImages", type: "BOOLEAN" },
            { name: "imagePaths", type: "STRING" }, // array — serialized
            { name: "model", type: "STRING" },
            { name: "modelOutput", type: "FLOAT" }, // enum — stored as string
            { name: "riskAssesment", type: "FLOAT" }, // nested object — stored as string
            { name: "staining", type: "STRING" }, // nested object — stored as string
            { name: "utensilStaining", type: "STRING" }, // optional nested object — stored as string
            { name: "wellInUse", type: "BOOLEAN" },
            { name: "flooding", type: "BOOLEAN" },
        ]
    };
}

function convertFirestoreTimestamp(obj: any): string | null {
    if (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj._seconds === "number" &&
        typeof obj._nanoseconds === "number"
    ) {
        const millis = obj._seconds * 1000 + Math.floor(obj._nanoseconds / 1e6);
        return new Date(millis).toISOString();
    }
    return null;
}

function preprocessRow(row: Record<string, any>): Record<string, any> {
    const cleanRow: Record<string, any> = {};

    
    const schema = defineWellTableSchema();
    if (!schema) throw new Error()
    if (!schema.fields) throw new Error()
    const allowedKeys = schema.fields.map(f => f.name);

    for (const key of allowedKeys) {
        if (!key) throw new Error()
        const value = row[key];

        // Normalize problematic fields
        if (["modelOutput", "riskAssesment", "geolocation", "mouzaGeolocation", "staining", "utensilStaining", "imagePaths"].includes(key)) {
            if (Array.isArray(value)) {
                cleanRow[key] = value.join(","); // safer than JSON string
            } else if (typeof value === "object" && value !== null) {
                cleanRow[key] = JSON.stringify(value);
            } else if (value !== undefined) {
                cleanRow[key] = String(value);
            }
            continue;
        }

        if (
            value === null ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            cleanRow[key] = value;
        } else if (value instanceof Date) {
            cleanRow[key] = value.toISOString();
        } else if (typeof value === "object" && value !== null) {
            const ts = convertFirestoreTimestamp(value);
            cleanRow[key] = ts ?? JSON.stringify(value);
        } else if (value !== undefined) {
            cleanRow[key] = String(value);
        }
    }

    return cleanRow;
}


async function importCollectionToBigQuery(collectionName: string) {
    const filePath = path.join(EXPORTS_DIR, `${collectionName}.json`);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}, skipping.`);
        return;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonArray = JSON.parse(fileContent);

    const table = bigquery.dataset(DATASET_ID).table(collectionName);

    console.log(`Uploading ${jsonArray.length} rows to ${DATASET_ID}.${collectionName}...`);

    try {
        await table.insert(jsonArray.map(preprocessRow));
        console.log(`✅ Uploaded ${collectionName}`);
    } catch (err: any) {
        if (err.name === "PartialFailureError") {
            console.error("❌ Partial insert failure:");
            err.errors.forEach((e: any, i: number) => {
                console.error(`Row ${i}:`, JSON.stringify(e, null, 2));
            });
        } else {
            console.error("❌ Failed to insert:", err);
        }
    }
}

async function main() {
    defineWellTableSchema()
    const wellTable = bigquery.dataset("default").table("well")
    const [exists] = await wellTable.exists()

    if (!exists) {
        console.log('creating well table')
        await wellTable.create({ schema: defineWellTableSchema() });
        console.log("✅ Created 'well' table")
        
        // wait for bigquery to realise table is created
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    for (const collection of COLLECTIONS) {
        await importCollectionToBigQuery(collection);
    }

    console.log("✅ All collections processed.");
}

await main().catch(console.error);

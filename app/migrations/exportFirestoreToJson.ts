import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import fs from "fs";
import path from "path";

// Initialize Firebase Admin SDK
initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();

const COLLECTIONS = ["apiKey", "migration", "token", "user", "well"];
const OUTPUT_DIR = "./firestore-export";

async function exportCollection(collectionName: string) {
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
        console.log(`No documents found in ${collectionName}.`);
        return;
    }

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const filePath = path.join(OUTPUT_DIR, `${collectionName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Exported ${data.length} documents from ${collectionName} to ${filePath}`);
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    for (const collectionName of COLLECTIONS) {
        try {
            await exportCollection(collectionName);
        } catch (error) {
            console.error(`Failed to export ${collectionName}:`, error);
        }
    }

    console.log("All exports complete.");
}

main().catch(console.error);

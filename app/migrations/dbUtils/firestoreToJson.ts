import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { promises as fs } from "fs";
import * as path from "path";

// Initialize Firebase
initializeApp({ credential: applicationDefault() });
const db = getFirestore();
const projectId = process.argv[2]

const WELL_FIELDS = [
    "id", "userId", "complete", "createdAt", "depth", "district", "division", "flooding",
    "geolocated", "hasImages", "model", "modelOutput", "mouza", "riskAssesment", "staining",
    "union", "upazila", "utensilStaining", "wellInUse"
];

function convertCreatedAt(createdAt: any): string {
    if (createdAt?._seconds) {
        const date = new Date(createdAt._seconds * 1000);
        return date.toISOString().split("T")[0].replace(/-/g, "/");
    }
    return "";
}

function escapeCSV(value: any): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

async function exportFirestore(): Promise<string> {
    console.log('================================')
    console.log(projectId)
    console.log('--------------------------------')
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const exportDir = path.join("firestore-export", projectId, timestamp);
    await fs.mkdir(exportDir, { recursive: true });

    const collections = await db.listCollections();

    for (const collection of collections) {
        const docs = await collection.listDocuments();
        const data: Record<string, any>[] = [];

        for (const docRef of docs) {
            const snapshot = await docRef.get();
            if (!snapshot.exists) continue;

            const docData = snapshot.data();
            data.push({
                id: snapshot.id,
                ...docData,
            });
        }

        const jsonPath = path.join(exportDir, `${collection.id}.json`);
        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2));
        console.log(`✅ Exported ${collection.id} to ${jsonPath}`);
    }

    console.log(`🎉 Firestore export completed: ${exportDir}`);
    return exportDir;
}

async function saveWellsAsCsv(exportDir: string) {
    const filePath = path.join(exportDir, "well.json");

    let raw: string;
    try {
        raw = await fs.readFile(filePath, "utf-8");
    } catch (err) {
        console.error(`❌ Failed to read ${filePath}:`, err);
        process.exit(1);
    }

    let data: any[];
    try {
        data = JSON.parse(raw);
    } catch (err) {
        console.error("❌ Failed to parse well.json:", err);
        process.exit(1);
    }

    const lines = [WELL_FIELDS.join(",")];

    for (const doc of data) {
        const row: string[] = [];

        for (const field of WELL_FIELDS) {
            if (field === "createdAt") {
                row.push(escapeCSV(convertCreatedAt(doc.createdAt)));
            } else {
                row.push(escapeCSV(doc[field]));
            }
        }

        lines.push(row.join(","));
    }

    const csvPath = path.join(exportDir, "well.csv");
    await fs.writeFile(csvPath, lines.join("\n"));
    console.log(`✅ Saved CSV to ${csvPath}`);
}

// Run the export and save CSV
const exportDir = await exportFirestore().catch((err) => {
    console.error("❌ Failed to export Firestore:", err);
    process.exit(1);
});

await saveWellsAsCsv(exportDir);

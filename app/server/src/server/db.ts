import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

export default db;

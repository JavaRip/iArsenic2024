import { Timestamp } from "firebase-admin/firestore"
import { ActionItem, ActionItemSchema } from "../models"
import db from '../db';
import { QueryTuple } from "../types";

export const ActionItemRepo = {
    async findById(id: string): Promise<ActionItem | null> {
        const snapshot = await db.collection('action-item').where('id', '==', id).get()

        if (snapshot.empty) return null
        const docData = snapshot.docs[0]?.data()
        if (!docData) return null

        const doc = {
            ...docData,
            createdAt: docData.createdAt instanceof Timestamp ?
                docData.createdAt.toDate() : docData,
        }

        const actionItem = ActionItemSchema.parse(doc)
        return actionItem
    },

    async create(actionItem: ActionItem): Promise<ActionItem> {
        const docRef = await db.collection('action-item').add(actionItem)
        const docSnapshot = await docRef.get()
        const doc = docSnapshot.data()

        if (!doc) throw new Error('Failed to create action-item')

        const createdActionItem = {
            ...doc,
            createdAt: doc.createdAt.toDate(),
        }

        const validatedActionItem = ActionItemSchema.parse(
            createdActionItem
        )

        return validatedActionItem
    },

    async getByQuery(queries: QueryTuple[]): Promise<ActionItem[]> {
        let dbQuery: FirebaseFirestore.Query<
            FirebaseFirestore.DocumentData
        > = db.collection('action-item')

        for (const [key, operator, value] of queries) {
            dbQuery = dbQuery.where(key, operator, value);
        }

        const snapshot = await dbQuery.get()
        const actionItems: ActionItem[] = []

        for (const actionItem of snapshot.docs) {
            const docData = actionItem.data()

            const actionItemData = {
                ...docData,
                createdAt: docData.createdAt instanceof Timestamp ?
                    docData.createdAt.toDate() :
                    docData.createdAt,
            }

            const validatedActionItem = ActionItemSchema.parse(actionItemData)
            actionItems.push(validatedActionItem)
        }

        return actionItems
    }
}
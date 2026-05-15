import { AccessToken, ActionItem, ActionItemSchema } from "../../models"

export default async function createActionItem(
    token: AccessToken | undefined,
    data: Partial<ActionItem> | undefined,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token?.id) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/action-item`, {
        method: 'POST',
        headers,
        ...(data ? { body: JSON.stringify(data) } : {})
    })

    if (!res.ok) throw new Error('Failed to create action item')

    const actionItem = await res.json()

    const validatedActionItem = ActionItemSchema.parse({
        ...actionItem,
        createdAt: new Date(actionItem.createdAt)
    })

    return validatedActionItem
}
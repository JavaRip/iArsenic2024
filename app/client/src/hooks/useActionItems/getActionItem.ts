import { ActionItemSchema, ActionItem, AccessToken } from "../../models";

export default async function getActionItem(
    token: AccessToken | undefined,
    actionItemId: string,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/action-item/${actionItemId}`, {
        headers,
    });

    if (!res.ok) {
        throw new Error('Failed to fetch action item');
    }

    const data = await res.json();

    const result = ActionItemSchema.safeParse({
        ...data,
        createdAt: new Date(data.createdAt),
    })

    if (!result.success) {
        console.error(result.error)
        throw result.error
    }

    return result.data as ActionItem
}
import { ActionItemSchema, ActionItem, AccessToken } from "../../models";

export default async function getActionItem(
    token: AccessToken | undefined,
    resourceId: string,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/action-item/resource/${resourceId}`, {
        headers,
    });

    if (!res.ok) {
        throw new Error('Failed to fetch action item');
    }

    const data = await res.json();

    const validatedActionItems: ActionItem[] = []

    for (const actionItem of data.actionItems) {
        const result = ActionItemSchema.safeParse({
            ...actionItem,
            createdAt: new Date(actionItem.createdAt),
        })

        if (result.error) {
            console.error('Failed to parse action item in getResourceActionItems')
            console.error(result)
            console.error(actionItem)
            continue
        }

        validatedActionItems.push(result.data)
    }

    return validatedActionItems.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }) as ActionItem[]
}
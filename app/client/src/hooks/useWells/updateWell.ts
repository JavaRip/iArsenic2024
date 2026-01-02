import { AccessToken, Well, WellSchema } from "../../models"

export default async function updateWell(
    token: AccessToken | undefined,
    wellId: string,
    data: Partial<Well>,
): Promise<Well> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/self/well/${wellId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Failed to update well')

    const body = await res.json()

    const result = WellSchema.safeParse({
        ...body,
        createdAt: new Date(body.createdAt),
    })

    if (!result.success) {
        console.error(result.error)
        throw result.error
    }

    return result.data as Well
}
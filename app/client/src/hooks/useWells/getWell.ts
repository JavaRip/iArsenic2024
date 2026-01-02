import { WellSchema, Well, AccessToken } from "../../models";

export default async function getWell(
    token: AccessToken | undefined,
    wellId: string,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/self/well/${wellId}`, {
        headers,
    });

    if (!res.ok) {
        throw new Error('Failed to fetch well');
    }

    const data = await res.json();

    const result = WellSchema.safeParse({
        ...data,
        createdAt: new Date(data.createdAt),
    })

    if (!result.success) {
        console.error(result.error)
        throw result.error
    }

    return result.data as Well
}
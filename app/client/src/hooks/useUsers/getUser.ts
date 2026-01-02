import { AccessToken, UserSchema } from "../../models";

export default async function getUser(
    token: AccessToken | undefined,
    userId: string,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/user/${userId}`, {
        method: 'GET',
        headers,
    });

    if (!res.ok) throw new Error('Failed to fetch user')

    const user = await res.json()

    return UserSchema.parse({
        ...user,
        createdAt: new Date(user.createdAt),
    })
}
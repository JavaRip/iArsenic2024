import { UserSchema, User, AccessToken } from "../../models";

export default async function updateUser(
    token: AccessToken | undefined,
    userId: string,
    updates: Partial<User>
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.authorization = `Bearer ${token.id}`;
    }

    const res = await fetch(`/api/v1/user/${userId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Failed to update user');

    const data = await res.json()

    const validatedUser = UserSchema.parse({
        ...data,
        createdAt: new Date((data as User).createdAt)
    })

    return validatedUser;
}
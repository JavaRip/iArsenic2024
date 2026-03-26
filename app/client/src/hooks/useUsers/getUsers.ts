import { AccessToken, User, UserSchema } from "../../models";

export default async function getUsers(
    token: AccessToken | undefined,
): Promise<User[]> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.authorization = `Bearer ${token.id}`;
    }

    const res = await fetch('/api/v1/users', {
        method: 'GET',
        headers,
    });

    if (!res.ok) throw new Error('Failed to fetch users');

    const data = await res.json();

    if (!Array.isArray(data.users)) {
        console.error('data.users is not array');
        console.error(data);
        throw new Error('Failed to fetch users');
    }

    const validatedUsers: User[] = [];

    for (const user of data.users) {
        const result = UserSchema.safeParse({
            ...user,
            createdAt: new Date(user.createdAt),
        });

        if (result.error) {
            console.error('Failed to parse user in getUsers');
            console.error(result);
            continue;
        }

        validatedUsers.push(result.data);
    }

    return validatedUsers.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) as User[];
}

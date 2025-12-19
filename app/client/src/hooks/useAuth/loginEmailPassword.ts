import { AccessTokenSchema, AccessToken, UserSchema, User } from 'iarsenic-types';

export default async function loginEmailPassword(
    email: string,
    password: string,
): Promise<{
    user: User,
    accessToken: AccessToken,
}> {
    const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            method: "email_pass",
            email,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();

    const parsedAccessToken = AccessTokenSchema.parse({
        ...data.accessToken,
        createdAt: new Date(data.accessToken.createdAt),
        expiresAt: new Date(data.accessToken.expiresAt),
        revokedAt: data.accessToken?.revokedAt ? 
            new Date(data.accessToken.revokedAt) :
            undefined,
    })

    const parsedUser = UserSchema.parse({
        ...data.user,
        createdAt: new Date(data.user.createdAt),
    })

    return { 
        accessToken: parsedAccessToken,
        user: parsedUser,
    }
}
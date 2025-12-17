import { AccessTokenSchema, AccessToken } from 'iarsenic-types';

export default async function loginEmailPassword(
    email: string,
    password: string,
): Promise<AccessToken> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            method: "username_pass",
            email,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();
    const parsedAccessToken = AccessTokenSchema.parse(data)
    return parsedAccessToken;
}
import { AccessTokenSchema, AccessToken } from 'iarsenic-types';

export default async function loginGoogle(
    googleIdToken: string,
): Promise<AccessToken> {
    const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            method: "google_oauth",
            idToken: googleIdToken,
        }),
    });

    if (!res.ok) {
        throw new Error('failed to login with google')
    }

    const data = await res.json();
    const parsedAccessToken = AccessTokenSchema.parse(data)
    return parsedAccessToken;
}
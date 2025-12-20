import { AccessTokenSchema, AccessToken } from 'iarsenic-types';

export default async function loginGoogle({
    // units language & username required because
    // login with google button both registers
    // and logs in simultaneously
    googleIdToken,
    language,
    units,
}: {
    googleIdToken: string;
    language: 'english' | 'bengali';
    units: 'meters' | 'feet';
}): Promise<AccessToken> {
    const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idToken: googleIdToken,
            language,
            method: "google_oauth",
            units,
        }),
    });

    if (!res.ok) {
        throw new Error('failed to login with google')
    }

    const data = await res.json();
    const parsedAccessToken = AccessTokenSchema.parse(data)
    return parsedAccessToken;
}
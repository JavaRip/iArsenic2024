import { AccessToken, AccessTokenSchema, User, UserSchema } from "iarsenic-types";

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
}): Promise<{
    user: User;
    accessToken: AccessToken;
}> {
    const res = await fetch("/api/v1/auth/register", {
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
        throw new Error('Failed to login with Google');
    }

    const data = await res.json();

    // Parse access token and convert dates
    const parsedAccessToken = AccessTokenSchema.parse({
        ...data.accessToken,
        createdAt: new Date(data.accessToken.createdAt),
        expiresAt: new Date(data.accessToken.expiresAt),
        revokedAt: data.accessToken?.revokedAt 
            ? new Date(data.accessToken.revokedAt) 
            : undefined,
    });

    // Parse user and convert dates
    const parsedUser = UserSchema.parse({
        ...data.user,
        createdAt: new Date(data.user.createdAt),
    });

    return {
        user: parsedUser,
        accessToken: parsedAccessToken,
    };
}

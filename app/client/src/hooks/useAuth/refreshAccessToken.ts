import { AccessToken, AccessTokenSchema } from "../../models";

export default async function refreshAccessToken(): Promise<AccessToken> {
    const res = await fetch("/api/v1/auth/refresh", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error('failed to refresh access token')
    }

    const data = await res.json();

    const parsedAccessToken = AccessTokenSchema.parse({
        ...data,
        createdAt: new Date(data.createdAt),
        expiresAt: new Date(data.expiresAt),
        revokedAt: data?.revokedAt ? 
            new Date(data.revokedAt) :
            undefined,
    })

    return parsedAccessToken;
}

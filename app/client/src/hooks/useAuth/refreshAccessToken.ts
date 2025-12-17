import { AccessToken, AccessTokenSchema } from "iarsenic-types";

export default async function refreshAccessToken(): Promise<AccessToken> {
    const res = await fetch("/api/auth/refresh", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error('failed to refresh access token')
    }

    const data = await res.json();
    const parsedAccessToken = AccessTokenSchema.parse(data)
    return parsedAccessToken;
}

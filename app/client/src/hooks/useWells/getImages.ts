import { AccessToken } from "../../models";

export default async function getImages(
    token: AccessToken | undefined,
    wellId: string,
) {
    const headers:  HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const urlsRes = await fetch(`/api/v1/self/well/${wellId}/signed-image-urls`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
    });

    if (!urlsRes.ok) {
        const text = await urlsRes.text();
        throw new Error("Failed to fetch signed URLs:" + text);
    }

    const { urls } = await urlsRes.json()
    return urls
}
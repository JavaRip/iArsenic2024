import { AccessToken } from "../../models";

export default async function deleteImage(
    token: AccessToken | undefined,
    wellId: string,
    path: string,
) {
    const headers: HeadersInit = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token.id}`;
    }

    const res = await fetch(`/api/v1/self/well/${wellId}/image`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ path }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error("Failed to delete image: " + text);
    }
}
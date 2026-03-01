import { AccessToken } from "../../models";
import { resizeImage } from "../../utils/resizeImage";

export default async function addImage(
    token: AccessToken | undefined,
    wellId: string,
    file: File,
) {
    let resizedBlob: Blob;
    try {
        resizedBlob = await resizeImage(file);
    } catch (resizeError) {
        console.error(resizeError)
        throw new Error(`Failed to resize image: ${String(resizeError)}`);
    }

    const headers:  HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const contentType = resizedBlob.type;
    const uploadUrlRes = await fetch(`/api/v1/self/well/${wellId}/upload-url`, {
        method: "POST",
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contentType })
    });

    if (!uploadUrlRes.ok) {
        throw new Error(await uploadUrlRes.text());
    }

    const { url, path } = await uploadUrlRes.json();

    const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': contentType
        },
        body: resizedBlob
    });

    if (!uploadRes.ok) {
        throw new Error("Failed to upload image to signed URL");
    }

    const confirmRes = await fetch(`/api/v1/self/well/${wellId}/confirm-upload`, {
        method: "POST",
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
    });

    if (!confirmRes.ok) {
        console.error('error confirming image upload / updating well image paths')
        throw new Error(await confirmRes.text());
    }

    const newUrlsRes = await fetch(`/api/v1/self/well/${wellId}/signed-image-urls`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ paths: [path] })
    });

    if (!newUrlsRes.ok) {
        console.error('error retrieving uploaded image url')
        throw new Error(await newUrlsRes.text())
    }

    const { urls } = await newUrlsRes.json();
    return urls
}
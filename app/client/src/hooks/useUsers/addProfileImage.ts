import { AccessToken } from "../../models";
import { resizeImage } from "../../utils/resizeImage";

export default async function addProfileImage(
    token: AccessToken | undefined,
    userId: string,
    file: File,
): Promise<string> {
    let resizedBlob: Blob;
    try {
        resizedBlob = await resizeImage(file);
    } catch (resizeError) {
        console.error(resizeError);
        throw new Error(`Failed to resize image: ${String(resizeError)}`);
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.authorization = `Bearer ${token.id}`;
    }

    const contentType = resizedBlob.type;

    const uploadUrlRes = await fetch(`/api/v1/user/${userId}/avatar-upload-url`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contentType }),
    });

    if (!uploadUrlRes.ok) {
        throw new Error(await uploadUrlRes.text());
    }

    const { url, path } = await uploadUrlRes.json();

    const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: resizedBlob,
    });

    if (!uploadRes.ok) {
        throw new Error('Failed to upload avatar to signed URL');
    }

    const confirmRes = await fetch(`/api/v1/user/${userId}/confirm-avatar-upload`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ path }),
    });

    if (!confirmRes.ok) {
        throw new Error(await confirmRes.text());
    }

    const updatedUser = await confirmRes.json();
    return updatedUser.avatarUrl;
}

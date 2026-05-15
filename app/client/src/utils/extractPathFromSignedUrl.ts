export default function extractPathFromSignedUrl(url: string): string {
    try {
        const u = new URL(url);
        const parts = u.pathname.split('/');
        const imagePath = parts.slice(2).join('/');
        return decodeURIComponent(imagePath);
    } catch (e) {
        throw new Error("Invalid URL — cannot extract path");
    }
}
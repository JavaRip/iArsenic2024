export default async function logoutFn(): Promise<void> {
    const res = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        const body = await res.json()
        const error = new Error(body.message || 'Logout failed') as Error & { knownError?: boolean };
        error.knownError = body.knownError ?? false;
        throw error;
    }
}

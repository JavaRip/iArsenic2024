export default async function verifyEmail(
    verifyEmailToken: string,
): Promise<void> {
    const res = await fetch(`/api/v1/auth/verify-email/${verifyEmailToken}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
        const body = await res.json();
        const error = new Error(
            body.message || 'Failed to verify email'
        ) as Error & { knownError?: boolean };
        error.knownError = body.knownError ?? false;

        throw error;
    }
}

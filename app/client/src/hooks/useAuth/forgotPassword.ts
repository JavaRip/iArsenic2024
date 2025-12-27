export default async function forgotPasswordFn(email: string): Promise<void> {
    const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })

    if (!res.ok) {
        const body = await res.json();
        const error = new Error(
            body.message || 'Failed to send reset link'
        ) as Error & { knownError?: boolean };
        error.knownError = body.knownError ?? false;

        throw error;
    }
}

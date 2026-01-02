export default async function resetPassword(
    resetPasswordToken: string,
    newPassword: string,
): Promise<void> {
    const res = await fetch(`/api/v1/auth/reset-password/${resetPasswordToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
    })

    if (!res.ok) {
        const body = await res.json();
        const error = new Error(
            body.message || 'Failed to reset password'
        ) as Error & { knownError?: boolean };
        error.knownError = body.knownError ?? false;

        throw error;
    }
}

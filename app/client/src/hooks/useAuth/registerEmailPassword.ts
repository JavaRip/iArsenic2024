export default async function registerEmailPassword({
    email,
    password,
    language,
    units,
    username,
}: {
    email: string;
    password: string;
    language: 'english' | 'bengali';
    units: 'meters' | 'feet';
    username: string,
}): Promise<void> {
    const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            language,
            method: "email_pass",
            password,
            units,
            username,
        }),
    });

    // TODO proper error handling probably including error boundary
    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Registration failed");
    }

    return;
}

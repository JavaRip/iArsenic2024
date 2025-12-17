export default async function registerEmailPassword({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<void> {
  const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            method: "username_pass",
            email,
            password,
        }),
    });

    // TODO proper error handling probably including error boundary
    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Registration failed");
    }

    return;
}

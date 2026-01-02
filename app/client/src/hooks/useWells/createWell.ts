import { AccessToken, Well, WellSchema } from "../../models";

export default async function createWell(
    token: AccessToken | undefined,
    data: Partial<Well> | undefined,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token?.id) {
        headers.authorization = `Bearer ${token.id}`;
    }

    const res = await fetch(`/api/v1/self/well`, {
        method: 'POST',
        headers,
        ...(data ? { body: JSON.stringify(data) } : {}),
    });

    if (!res.ok) throw new Error('Failed to create well');

    const well = await res.json();

    const validatedWell = WellSchema.parse({
        ...well,
        createdAt: new Date(well.createdAt),
    })

    // Optionally store unclaimed well ID in localStorage
    if (!token?.id) {
        const stored = localStorage.getItem("unclaimedWellIds");
        const unclaimed: string[] = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
            "unclaimedWellIds",
            JSON.stringify([...unclaimed, validatedWell.id]),
        );
    }

    return well as Well;

}
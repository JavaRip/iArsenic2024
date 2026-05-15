import { AccessToken, Well, WellSchema } from "../../models";

export default async function getWells(
    token: AccessToken | undefined,
) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.authorization = `Bearer ${token.id}`
    }

    const res = await fetch(`/api/v1/wells`, {
        headers,
    });

    if (!res.ok) throw new Error('Failed to fetch wells');

    const data = await res.json();

    if (!Array.isArray(data.wells)) {
        console.error('data.wells is not array')
        console.log(data)

        throw new Error('Failed to fetch wells')
    }

    const validatedWells: Well[] = []

    for (const well of data.wells) {
        const result = WellSchema.safeParse({
            ...well,
            createdAt: new Date(well.createdAt),
        })

        if (result.error) {
            console.error('Failed to parse well in getWells')
            console.error(result)
            continue
        } 

        validatedWells.push(result.data)
    }

    return validatedWells.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }) as Well[]
}
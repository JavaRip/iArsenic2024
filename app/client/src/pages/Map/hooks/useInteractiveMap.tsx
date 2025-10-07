import { useQuery } from "@tanstack/react-query";

async function getInteractiveMap() {
    const res = await fetch(`/interactive-map.geojson`);
    return await res.json();
}

export default function useRegionTranslations() {
    return useQuery({
        queryKey: ['interactive-map'],
        queryFn: getInteractiveMap,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
    });
}

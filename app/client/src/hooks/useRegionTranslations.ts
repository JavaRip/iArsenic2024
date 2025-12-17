import { useQuery } from "@tanstack/react-query";
import fetchRegionTranslations from "../utils/RegionTranslationsFetcher";
import type { RegionTranslations } from "../types";

export default function useRegionTranslations() {
    return useQuery<RegionTranslations>({
        queryKey: ["region-translations"],
        queryFn: fetchRegionTranslations,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
    });
}

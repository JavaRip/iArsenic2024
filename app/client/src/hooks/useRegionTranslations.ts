import { useQuery } from '@tanstack/react-query';
import { RegionTranslations } from '../types';

export function useRegionTranslations() {
    return useQuery<RegionTranslations, Error>({
        queryKey: ['region-translations'],
        queryFn: async () => {
            const res = await fetch('/region-translations.json');
            if (!res.ok) throw new Error('Failed to load region translations');
            return res.json();
        },
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

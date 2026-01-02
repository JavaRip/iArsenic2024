import { useQuery } from '@tanstack/react-query';
import { DropdownDivision } from '../types';

export function useDropdownData() {
    return useQuery<DropdownDivision[]>({
        queryKey: ['dropdown-data', 'model6'],
        queryFn: async () => {
            const res = await fetch('/model6/dropdown-data.json');
            if (!res.ok) {
                throw new Error('Failed to load dropdown data');
            }
            return res.json();
        },

        // 🧠 Cache behavior
        staleTime: 60 * 60 * 1000,

        // 🔄 Background refetch
        refetchInterval: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
}

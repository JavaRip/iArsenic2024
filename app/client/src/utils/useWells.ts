import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Well } from 'iarsenic-types';
import { useAccessToken } from '../utils/useAccessToken';

export function useWells() {
    const { data: token } = useAccessToken();
    const queryClient = useQueryClient();

    const getWell = (wellId?: string) => {
        return useQuery<Well>({
            queryKey: ['well', wellId],
            enabled: !!wellId,
            queryFn: async () => {
                const headers: HeadersInit = {}

                if (token) {
                    headers.authorization = `Bearer ${token?.id}`
                }

                const res = await fetch(`/api/v1/self/well/${wellId}`, {
                    headers,
                });

                if (!res.ok) throw new Error('Failed to fetch well');
                return res.json();
            },
        });
    };

    const getWells = () => {
        return useQuery<Well[]>({
            queryKey: ['wells'],
            queryFn: async () => {
                const headers: HeadersInit = {}

                if (token) {
                    headers.authorization = `Bearer ${token?.id}`
                }

                const res = await fetch(`/api/v1/wells`, {
                    headers,
                });

                if (!res.ok) throw new Error('Failed to fetch wells');
                const data = await res.json();
                return data.wells
            },
        });
    };

    const updateWell = () => {
        return useMutation({
            mutationFn: async ({ wellId, data }: { wellId: string; data: Partial<Well> }) => {
                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                }

                if (token) {
                    headers.authorization = `Bearer ${token?.id}`
                }

                const res = await fetch(`/api/v1/self/well/${wellId}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(data),
                })

                if (!res.ok) throw new Error('Failed to update well')
                return res.json()
            },
            onSuccess: (_data, { wellId }) => {
                queryClient.invalidateQueries({ queryKey: ['well', wellId] })
                queryClient.invalidateQueries({ queryKey: ['wells'] })
            },
        });
    };

    const createWell = () => {
        return useMutation({
            mutationFn: async (data?: Partial<Well>) => {
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

                // Optionally store unclaimed well ID in localStorage
                if (!token?.id) {
                    const stored = localStorage.getItem("unclaimedWellIds");
                    const unclaimed: string[] = stored ? JSON.parse(stored) : [];
                    localStorage.setItem("unclaimedWellIds", JSON.stringify([...unclaimed, well.id]));
                }

                return well as Well;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['wells'] });
            },
        });
    };

    return { getWell, getWells, updateWell, createWell };
}

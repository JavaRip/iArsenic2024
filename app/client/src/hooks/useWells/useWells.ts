import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../useAuth/useAuth';
import { Well, WellSchema } from '../../models';
import getWellFn from './getWell'
import getWellsFn from './getWells'
import createWellFn from './createWell'
import updateWellFn from './updateWell'

export function useWells() {
    const auth = useAuth();
    const { data: token } = auth.getAccessToken
    const queryClient = useQueryClient();

    const getWell = (wellId?: string) => {
        return useQuery<Well>({
            queryKey: ['well', wellId],
            enabled: !!wellId,
            // wellId asserted as not undefined as query
            // not enabled without it
            queryFn: () => getWellFn(token, wellId!),
        });
    };

    const getWells = () => {
        return useQuery<Well[]>({
            queryKey: ['wells'],
            queryFn: () => getWellsFn(token),
        });
    };

    const updateWell = () => {
        return useMutation({
            mutationFn: ({
                data,
                wellId,
            }: {
                data: Partial<Well>,
                wellId: string, 
            }) => {
                return updateWellFn(
                    token,
                    wellId,
                    data,
                )
            },
            onMutate: async ({ wellId, data }) => {
                await queryClient.cancelQueries({ queryKey: ['well', wellId] });

                const previousWell = queryClient.getQueryData<Well>([
                    'well',
                    wellId,
                ])

                queryClient.setQueryData<Well>(
                    ['well', wellId],
                    (old) => old ? { ...old, ...data } : old,
                )

                return { previousWell }
            },
            onError: (_err, { wellId }, context) => {
                if (context?.previousWell) {
                    queryClient.setQueryData(
                        ['well', wellId],
                        context.previousWell
                    );
                }
            },
            onSettled: (updatedWell, _error, { wellId }) => {
                queryClient.setQueryData(['well', wellId], updatedWell)
                queryClient.setQueryData<Well[]>(['wells'], (old) => {
                    if (!updatedWell || !old) {
                        return old
                    } else {
                        old.map((w) => (w.id === updatedWell.id ? updatedWell : w))
                    }
                });
            },
        });
    };

    const createWell = () => {
        return useMutation({
            mutationFn: (data?: Partial<Well>) => {
                return createWellFn(token, data)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['wells'] });
            },
        });
    };

    return { 
        getWell,
        getWells,
        updateWell,
        createWell,
    };
}

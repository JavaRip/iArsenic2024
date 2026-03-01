import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../useAuth/useAuth';
import { Well } from '../../models';
import getWellFn from './getWell'
import getWellsFn from './getWells'
import createWellFn from './createWell'
import updateWellFn from './updateWell'
import getImagesFn from './getImages'
import addImageFn from './addImage'
import deleteImageFn from './deleteImage'

export function useWells() {
    const auth = useAuth();
    const { data: token } = auth.getAccessToken
    const queryClient = useQueryClient();

    const addImage = (
        fileInputRef: React.RefObject<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) => {
        return useMutation({
            mutationFn: ({
                wellId,
                file,
            }: {
                wellId: string,
                file: File,
            }) => {
                return addImageFn(
                    token,
                    wellId,
                    file,
                )
            },
            onSuccess: () => {
                setFile(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onSettled: (urls, _error, { wellId, file }) => {
                queryClient.setQueryData(
                    ['well-images', wellId],
                    urls
                )

                queryClient.invalidateQueries({
                    queryKey: ['well', wellId],
                })
            },
        });
    }

    const deleteImage = () => {
        return useMutation({
            mutationFn: ({
                wellId,
                path,
            }: {
                wellId: string,
                path: string,
            }) => {
                return deleteImageFn(
                    token,
                    wellId,
                    path,
                )
            },
            onSettled: (_, _error, { wellId }) => {
                queryClient.invalidateQueries({
                    queryKey: ['well-images', wellId],
                })

                queryClient.invalidateQueries({
                    queryKey: ['well', wellId],
                })
            },
        });
    }

    const getImages = (wellId?: string) => {
        return useQuery<string[]>({
            queryKey: ['well-images', wellId],
            enabled: !!wellId,
            queryFn: () => getImagesFn(token, wellId!)
        })
    }

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
        addImage,
        deleteImage,
        getImages,
        getWell,
        getWells,
        updateWell,
        createWell,
    };
}

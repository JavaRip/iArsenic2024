import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../useAuth/useAuth"
import { User, UserSchema } from "../../models"
import getUserFn from './getUser'
import getUsersFn from './getUsers'
import updateUserFn from './updateUser'
import addProfileImageFn from './addProfileImage'

export function useUsers() {
    const auth = useAuth()
    const { data: token } = auth.getAccessToken
    const queryClient = useQueryClient()

    const getUsers = () => {
        return useQuery<User[]>({
            queryKey: ['users'],
            queryFn: () => getUsersFn(token),
        });
    };

    const getUser = (userId?: string) => {
        return useQuery<User | 'guest'>({
            queryKey: ['user', userId],
            enabled: !!userId,
            queryFn: () => getUserFn(token, userId!)
        })
    }

    const updateUser = () => {
        return useMutation({
            mutationFn: async ({
                userId,
                updates,
            }: {
                userId: string;
                updates: Partial<User>;
            }): Promise<User> => {
                return updateUserFn(
                    token,
                    userId,
                    updates,
                )
            },
            // ✅ OPTIMISTIC UPDATE
            onMutate: async ({ userId, updates }) => {
                // Cancel outgoing refetches
                await queryClient.cancelQueries({ queryKey: ['user', userId] });

                // Snapshot previous value
                const previousUser = queryClient.getQueryData<User>([
                    'user',
                    userId,
                ]);

                // Optimistically update cache
                queryClient.setQueryData<User>(
                    ['user', userId],
                    (old) => {
                        return old
                            ? UserSchema.parse({
                                ...old,
                                ...updates,
                            }) :
                            old
                    }
                );

                // Return context for rollback
                return { previousUser };
            },
            // ❌ ROLLBACK ON ERROR
            onError: (_err, { userId }, context) => {
                if (context?.previousUser) {
                    queryClient.setQueryData(
                        ['user', userId],
                        context.previousUser
                    );
                }
            },
            // 🔄 REVALIDATE
            onSettled: (updatedUser, _error, { userId }) => {
                if (!updatedUser) return;

                const validatedUpdatedUser = UserSchema.parse({
                    ...updatedUser,
                    createdAt: new Date(updatedUser.createdAt),
                })
                queryClient.setQueryData(
                    ['user', userId],
                    validatedUpdatedUser,
                );
                queryClient.setQueryData<User[]>(['users'], (old) =>
                    old?.map((u) => (
                        u.id === updatedUser.id ?
                        validatedUpdatedUser :
                        u
                    ))
                );
            },
        })
    };

    const updateProfileImage = (
        fileInputRef: React.RefObject<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) => {
        return useMutation({
            mutationFn: ({
                userId,
                file,
            }: {
                userId: string;
                file: File;
            }) => {
                return addProfileImageFn(token, userId, file);
            },
            onSuccess: () => {
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onSettled: (_avatarUrl, _error, { userId }) => {
                queryClient.invalidateQueries({ queryKey: ['user', userId] });
            },
        });
    };

    return {
        getUsers,
        getUser,
        updateUser,
        updateProfileImage,
    }
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./useAuth/useAuth"
import { User } from "../models"

export function useUsers() {
    const auth = useAuth()
    const { data: token } = auth.getAccessToken
    const queryClient = useQueryClient()

    const getUser = (userId: string | undefined) => {
        return useQuery<User>({
            enabled: !!userId,
            queryKey: ['user', userId],
            queryFn: async () => {
                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                }

                if (token) {
                    headers.authorization = `Bearer ${token.id}`
                }

                const res = await fetch(`/api/v1/user/${userId}`, {
                    method: 'GET',
                    headers,
                });

                if (!res.ok) throw new Error('Failed to fetch user')
                return res.json()
            }
        })
    }

    const updateUser = () => {
        return useMutation({
            mutationFn: async ({
            userId,
            data,
        }: {
            userId: string;
            data: Partial<User>;
        }) => {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers.authorization = `Bearer ${token.id}`;
            }

            const res = await fetch(`/api/v1/user/${userId}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to update user');
            return res.json();
        },
        // ✅ OPTIMISTIC UPDATE
        onMutate: async ({ userId, data }) => {
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
                (old) => old ? { ...old, ...data } : old,
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
                queryClient.setQueryData(['user', userId], updatedUser);
                queryClient.setQueryData<User[]>(['users'], (old) =>
                    old?.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );
            },
        }
    )};

    return {
        getUser,
        updateUser,
    }
}
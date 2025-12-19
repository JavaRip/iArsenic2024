import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./useAuth/useAuth"
import { User } from "iarsenic-types"

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
                }

                if (token) {
                    headers.authorization = `Bearer ${token.id}`
                }

                const res = await fetch(`/api/v1/well/${userId}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(data),
                })

                if (!res.ok) throw new Error('Failed to update user')
                return res.json()
            },
            onSuccess: (_data, { userId }) => {
                queryClient.invalidateQueries({ queryKey: ['user', userId] })
                queryClient.invalidateQueries({ queryKey: ['users'] })
                queryClient.invalidateQueries({ queryKey: ['accessToken'] });
            },
        });
    };

    return {
        getUser,
        updateUser,
    }
}
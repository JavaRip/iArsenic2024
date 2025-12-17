import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import loginEmailPasswordFn from "./loginEmailPassword";
import loginGoogleFn from "./loginGoogle";
import refreshAccessTokenFn from "./refreshAccessToken";
import registerEmailPasswordFn from "./registerEmailPassword";

export function useAuth() {
    const queryClient = useQueryClient();

    const loginEmailPassword = useMutation({
        mutationFn: ({ 
            email,
            password,
        }: { 
            email: string;
            password: string;
        }) =>
            loginEmailPasswordFn(email, password),
        onSuccess: (accessToken) => {
            queryClient.setQueryData(['auth', 'accessToken'], accessToken)
            getAccessToken.refetch()
        }
    });

    const loginGoogle = useMutation({
        mutationFn: ({ googleIdToken }: { googleIdToken: string }) =>
            loginGoogleFn(googleIdToken),
        onSuccess: (accessToken) => {
            queryClient.setQueryData(['auth', 'accessToken'], accessToken)
            getAccessToken.refetch()
        }
    })

  const registerEmailPassword = useMutation({
    mutationFn: (data: {
        email: string,
        password: string,
    }) =>
        registerEmailPasswordFn(data),
    });

    const getAccessToken = useQuery({
        queryFn: async () => await refreshAccessTokenFn(),
        queryKey: ['auth', 'accessToken'],
        refetchInterval: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: 1000 * 60 * 10,
    })

    return { 
        getAccessToken,
        loginEmailPassword,
        loginGoogle,
        registerEmailPassword,
    };
}

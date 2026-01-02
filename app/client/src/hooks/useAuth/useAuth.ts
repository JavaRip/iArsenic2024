import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import loginEmailPasswordFn from "./loginEmailPassword";
import loginGoogleFn from "./loginGoogle";
import refreshAccessTokenFn from "./refreshAccessToken";
import registerEmailPasswordFn from "./registerEmailPassword";
import forgotPasswordFn from "./forgotPassword";
import resetPasswordFn from "./resetPassword";
import verifyEmailFn from "./verifyEmail"
import logoutFn from "./logout"

export function useAuth() {
    const queryClient = useQueryClient();

    const loginEmailPassword = useMutation({
        mutationFn: ({ 
            email,
            password,
        }: { 
            email: string;
            password: string;
        }) => loginEmailPasswordFn(email, password),
        onSuccess: ({ accessToken, user }) => {
            queryClient.setQueryData(['auth', 'accessToken'], accessToken)
            queryClient.setQueryData(['user', user.id], user)
            getAccessToken.refetch()
        }
    });

    const loginGoogle = useMutation({
        mutationFn: ({ 
            googleIdToken,
            language,
            units,
        }: {
            googleIdToken: string;
            language: 'english' | 'bengali',
            units: 'meters' | 'feet',
        }) =>
            loginGoogleFn({
                googleIdToken,
                language,
                units,
            }),
        onSuccess: (accessToken) => {
            queryClient.setQueryData(['auth', 'accessToken'], accessToken)
            getAccessToken.refetch()
        }
    })

    const registerEmailPassword = useMutation({
        mutationFn: (data: {
            email: string,
            password: string,
            language: 'english' | 'bengali',
            units: 'meters' | 'feet',
            username: string,
        }) =>
            registerEmailPasswordFn(data),
        });

    const getAccessToken = useQuery({
        queryFn: async () => await refreshAccessTokenFn(),
        queryKey: ['auth', 'accessToken'],
        refetchInterval: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        retry: false,
        staleTime: 0,
    })

    const forgotPassword = useMutation({
        mutationFn: (email: string) => forgotPasswordFn(email),
    });

    const resetPassword = useMutation({
        mutationFn: ({
            resetPasswordToken,
            newPassword,
        } : {
            resetPasswordToken: string,
            newPassword: string,
        }) => resetPasswordFn(
            resetPasswordToken,
            newPassword,
        ),
    });

    const verifyEmail = useMutation({
        mutationFn: ({
            verifyEmailToken,
        } : {
            verifyEmailToken: string,
        }) => verifyEmailFn(
            verifyEmailToken,
        ),
    });

    const logout = useMutation({
        mutationFn: () => logoutFn(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['auth', 'accessToken'] });
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.clear();
        },
        onError: (err: unknown) => {
            console.error("Logout failed", err);
        },
    });

    return { 
        forgotPassword,
        getAccessToken,
        loginEmailPassword,
        loginGoogle,
        registerEmailPassword,
        resetPassword,
        verifyEmail,
        logout,
    };
}

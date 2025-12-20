import { useEffect, useRef } from "react";
import { Typography, Stack } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { useUnits } from "../../../hooks/useUnits";

export default function GoogleLoginSection() {
    const auth = useAuth()
    const { language } = useLanguage()
    const { units } = useUnits()

    const loginGoogle = auth.loginGoogle;
    const googleBtnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        /* global google */
        if (!window.google || !googleBtnRef.current) return;

        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: (response: { credential: string }) => {
                const googleIdToken = response.credential;

                loginGoogle.mutate({ 
                    googleIdToken,
                    language,
                    units,
                }, {
                    onSuccess: () => {
                        console.log("Google login success");
                    },
                    onError: (err) => {
                        console.error("Google login failed", err);
                    },
                });
            },
        });

        google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "filled_blue",
            size: "large",
            width: 240,
        });
    }, [loginGoogle]);

  return (
        <>
            <Typography variant="h5" mb={2}>
                Login with Google
            </Typography>

            <Stack spacing={2}>
                <div ref={googleBtnRef} />
                {loginGoogle.isPending && <Typography>Authenticating…</Typography>}
            </Stack>
        </>
    );
}

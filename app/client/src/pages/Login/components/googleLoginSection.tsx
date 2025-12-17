"use client"
import { useEffect, useRef } from "react";
import { Typography, Stack } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth/useAuth";

export default function GoogleLoginSection() {
    const auth = useAuth()
    const loginGoogle = auth.loginGoogle;
    const googleBtnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        /* global google */
        if (!window.google || !googleBtnRef.current) return;

        google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: (response: { credential: string }) => {
                const googleIdToken = response.credential;

                loginGoogle.mutate({ googleIdToken }, {
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
            width: "100%",
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

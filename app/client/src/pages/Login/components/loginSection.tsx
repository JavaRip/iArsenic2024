import { Typography, Stack, TextField, Button, CircularProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { useUnits } from "../../../hooks/useUnits";
import { useLanguage } from "../../../hooks/useLanguage";
import Divider from '@mui/material/Divider';
import { navigate } from "wouter/use-browser-location";

export default function LoginSection() {
    const auth = useAuth()
    const loginEmailPassword = auth.loginEmailPassword;

    const [error, setError] = useState<string | null>(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [progress, setProgress] = useState(0);

    const [authenticating, setAuthenticating] = useState(false)

    const { language } = useLanguage()
    const { units } = useUnits()
    
    const loginGoogle = auth.loginGoogle;
    const googleBtnRef = useRef<HTMLDivElement | null>(null);

    async function handleLogin() {
        setAuthenticating(true);
        setError(null)

        if (loginEmail == "") {
            setError('Please provide email')
            return
        }

        if (loginPassword == "") {
            setError('Please provide password')
            return
        }

        try {
            loginEmailPassword.mutate(
                { email: loginEmail, password: loginPassword },
                {
                    onError: (err: unknown) => {
                        console.error(err);
                        setError((err as Error).message || "Login failed");
                    },
                }
            );
        } finally {
            setAuthenticating(false)
        }
    };

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
                    onError: (err) => {
                        console.error("Google login failed", err);
                        setError((err as Error).message || "Login failed");
                    },
                });
            },
        });

        google.accounts.id.renderButton(googleBtnRef.current, {
            type: 'standard',
            theme: "filled_blue",
            size: "large",
            width: 240,
        });
    }, [loginGoogle]);

    useEffect(() => {
        if (
            !loginEmailPassword.isSuccess &&
            !loginGoogle.isSuccess
        ) return;

        setProgress(0);

        const start = Date.now();
        const duration = 2000;

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percent = Math.min((elapsed / duration) * 100, 100);
            setProgress(percent);

            if (percent === 100) {
                clearInterval(interval);
                navigate("/landing");
            }
        }, 64);

        return () => clearInterval(interval);
    }, [
        loginEmailPassword.isSuccess,
        loginGoogle.isSuccess,
        navigate,
    ]);

    return (
        <>
            <Typography variant="h5" mb={2}>
                Login
            </Typography>

            {error && (
                <Typography color="error" mb={2}>
                    {error}
                </Typography>
            )}

            {(
                loginEmailPassword.isSuccess ||
                loginGoogle.isSuccess
            ) && (
                <Stack direction='row' justifyContent='center'>
                    <Typography mb={2} mr={2} color="primary">
                        Login Successful
                    </Typography>

                    <CircularProgress
                        variant="determinate"
                        size={24}
                        thickness={4}
                        value={progress}
                    />
                </Stack>
            )}

            <Stack
                spacing={2}
            >
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />

                <Button
                    sx={{ height: '4rem' }}
                    variant='contained'
                    disabled={loginEmailPassword.isPending}
                    onClick={handleLogin}
                    fullWidth
                >
                    {authenticating ? (
                        <CircularProgress />
                    ): (
                        'Login'
                    )}
                </Button>

                <Button
                    sx={{ height: '4rem' }}
                    variant='outlined'
                    onClick={() => navigate('/forgot-password')}
                    fullWidth
                >
                    Forgot Password
                </Button>
            </Stack>

            <Divider
                sx={{
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 2,
                }}
            />

            <Typography variant="h5" mb={2}>
                Login with Google
            </Typography>

            <Stack spacing={2} mb={4}>

                {loginGoogle.isPending ? (
                    <Stack
                        direction="column"
                        alignContent="center"
                        justifyContent="center"
                    >
                        <CircularProgress />
                    </Stack>
                ) : (
                    <div ref={googleBtnRef} />
                )}
            </Stack>
        </>
    )
}
import { Typography, Stack, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { AccessToken } from "iarsenic-types";

export default function LoginSection() {
    const auth = useAuth()
    const loginEmailPassword = auth.loginEmailPassword;

    const [error, setError] = useState<string | null>(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = () => {
        setError(null);

        loginEmailPassword.mutate(
        { email: loginEmail, password: loginPassword },
        {
            onSuccess: (token: AccessToken) => {
                console.log("Logged in, access token:", token);
            },
            onError: (err: unknown) => {
                console.error(err);
                setError((err as Error).message || "Login failed");
            },
        }
        );
    };

    return (
        <>
            <Typography variant="h5" mb={2}>
                Login
            </Typography>

            {error && <Typography color="error" mb={2}>{error}</Typography>}

            <Stack spacing={2} mb={4}>
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
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loginEmailPassword.isPending}
                >
                    {loginEmailPassword.isPending ? "Logging in..." : "Login"}
                </Button>
            </Stack>
        </>
    )
}
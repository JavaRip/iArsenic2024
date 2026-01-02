import { Typography, Stack, TextField, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { useUnits } from "../../../hooks/useUnits";
import validatePassword from "../../../utils/validateNewPassword";
import { navigate } from "wouter/use-browser-location";

export default function RegisterSection() {
    const auth = useAuth()
    const registerEmailPassword = auth.registerEmailPassword;

    const { language } = useLanguage()
    const { units } = useUnits()

    const [error, setError] = useState<string | null>(null);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [progress, setProgress] = useState(0);

    const handleRegister = () => {
        setError(null);

        if (registerEmail == "") {
            setError('Please provide email')
            return
        }

        if (registerName == "") {
            setError('Please provide name')
            return
        }

        if (registerPassword == "") {
            setError('Please provide password')
            return
        }

        const passwordError = validatePassword(registerPassword)

        if (passwordError) {
            setError(passwordError)
            return
        }

        registerEmailPassword.mutate(
            { 
                password: registerPassword,
                email: registerEmail,
                language,
                units,
                username: registerName,
            },
            {
                onError: (err: unknown) => {
                    console.error(err);
                    setError((err as Error).message || "Register failed");
                },
            }
        );
    };

    useEffect(() => {
        if (
            !registerEmailPassword.isSuccess
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
        registerEmailPassword.isSuccess,
        navigate,
    ]);
    return (
        <Stack width="100%" alignItems="center" justifyContent="center">
            <Typography variant="h5" mb={2}>
                Register
            </Typography>

            {error && (
                <Typography color="error" mb={4}>
                    {error}
                </Typography>
            )}

            {registerEmailPassword.isSuccess && (
                <Stack direction='row' justifyContent='center'>
                    <Typography mb={2} mr={2} color="primary">
                        Register Successful
                    </Typography>

                    <CircularProgress
                        variant="determinate"
                        size={24}
                        thickness={4}
                        value={progress}
                    />
                </Stack>
            )}

            <Stack spacing={2} mb={4}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />

                <TextField
                    label="Name"
                    type="name"
                    fullWidth
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />

                <Button
                    sx={{ height: '4rem' }}
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    disabled={registerEmailPassword.isPending}
                >
                    {registerEmailPassword.isPending ? (
                        <CircularProgress /> 
                    ) : (
                        "Register"
                    )}
                </Button>
            </Stack>
        </Stack>
    )
}
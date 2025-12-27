import { Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { useUnits } from "../../../hooks/useUnits";

export default function RegisterSection() {
    const auth = useAuth()
    const registerEmailPassword = auth.registerEmailPassword;
    const { language } = useLanguage()
    const { units } = useUnits()

    const [error, setError] = useState<string | null>(null);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const handleRegister = () => {
        setError(null);
        registerEmailPassword.mutate(
            { 
                password: registerPassword,
                email: registerEmail,
                language,
                units,
                username: registerName,
            },
            {
                onSuccess: () => {
                    console.log("Registered Successfully");
                },
                onError: (err: unknown) => {
                    console.error(err);
                    setError((err as Error).message || "Register failed");
                },
            }
        );
    };

    return (
        <>
            <Typography variant="h5" mb={2}>
                Register
            </Typography>

            {error && <Typography color="error" mb={2}>{error}</Typography>}

            <Stack spacing={2}>
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
                    {registerEmailPassword.isPending ? "Registering..." : "Register"}
                </Button>
            </Stack>
        </>
    )
}
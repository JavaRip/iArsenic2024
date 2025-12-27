import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import TranslatableText from "../../components/TranslatableText";
import PageCard from "../../components/PageCard";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { navigate } from "wouter/use-browser-location";

export default function ResetPassword(): JSX.Element {
    const [, params] = useRoute('/reset-password/:token');
    const resetPasswordToken = params?.token;

    const auth = useAuth()
    const { resetPassword } = auth

    const [newPassword, setNewPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    function handleNewPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value);
    }

    // TODO create single function for this
    function validatePassword(password: string): string | null {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }

        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must contain at least one special character.";
        }

        return null;
    }

    async function handlePasswordReset() {
        try {
            setError(null)
            if (!newPassword) return;

            if (!resetPasswordToken) {
                setError('No reset token in url')
                throw new Error('No reset password token in url')
            }

            const passwordError = validatePassword(newPassword);
            if (passwordError) {
                setError(passwordError);
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            await resetPassword.mutateAsync({
                resetPasswordToken,
                newPassword,
            })
        } catch (err: unknown) {
            console.error(err)
            if (err instanceof Error && (err as any).knownError) {
                setError(err.message);
            } else {
                setError("Unable to reset password");
            }
        }
    }

    useEffect(() => {
        if (
            !resetPassword.isSuccess
        ) return

        setProgress(0)

        const start = Date.now()
        const duration = 2000

        const interval = setInterval(() => {
            const elapsed = Date.now() - start
            const percent = Math.min((elapsed / duration) * 100, 100);
            setProgress(percent);

            if (percent === 100) {
                clearInterval(interval);
                navigate("/login");
            }
        }, 64)

        return () => clearInterval(interval);
    }, [
        resetPassword.isSuccess,
        navigate,
    ])

    return (
        <Stack width="100%" alignItems="center" justifyContent="center">
            <PageCard>
                <TranslatableText 
                    mb='1rem' 
                    textAlign='center' 
                    variant='h4'
                    english='Reset Password'
                    bengali='BENGALI PLACEHOLDER'
                />

                {error && (
                    <TranslatableText 
                        mb='1rem' 
                        textAlign='center' 
                        color='error'
                        error={true}
                        english={error}
                        bengali='BENGALI PLACEHOLDER'
                    />
                )}

                {resetPassword.isSuccess && (
                    <Stack direction='row' justifyContent='center'>
                        <TranslatableText 
                            mb={2}
                            mr={2}
                            color='primary'
                            textAlign='center' 
                            english='Password reset successfully'
                            bengali='BENGALI PLACEHOLDER'
                        />

                        <CircularProgress
                            variant="determinate"
                            size={24}
                            thickness={4}
                            value={progress}
                        />
                    </Stack>
                )}

                <Stack spacing={2}>
                    <TextField
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        disabled={resetPassword.isPending}
                        label={
                            <TranslatableText 
                                mb='1rem' 
                                textAlign='center' 
                                variant='body1'
                                english='New Password'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        }
                    />

                    <TextField
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        disabled={resetPassword.isPending}
                        label={
                            <TranslatableText 
                                mb='1rem' 
                                textAlign='center' 
                                variant='body1'
                                english='Confirm Password'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        }
                    />

                    <Button
                        sx={{ height: '4rem' }}
                        variant='contained'
                        onClick={handlePasswordReset}
                        fullWidth
                        disabled={
                            resetPassword.isPending ||
                            !newPassword ||
                            !confirmPassword
                        }
                    >
                        {
                            resetPassword.isPending ?
                                <CircularProgress /> :
                                'Reset Password'
                        }
                    </Button>
                </Stack>
            </PageCard>
        </Stack>
    );
}

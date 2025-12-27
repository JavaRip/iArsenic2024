import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import TranslatableText from "../../components/TranslatableText";
import { useAuth } from "../../hooks/useAuth/useAuth";

export default function ForgotPassword(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const auth = useAuth()
    const { resetPassword } = auth

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    async function handlePasswordReset() {
        try {
            await resetPassword.mutateAsync(email);
            setSuccess(true);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error && (err as any).knownError) {
                setError(err.message);
            } else {
                setError("Failed to send reset link.");
            }
        } 
    }

    return (
        <>
            <Card
                variant='outlined'
                sx={{
                    margin: '0 1rem 1rem 1rem',
                    padding: '1rem',
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    pb: '2rem',
                }}
            >
                <TranslatableText 
                    mb='1rem'
                    textAlign="center"
                    variant='h4'
                    english='Forgot Password'
                    bengali='BENGALI PLACEHOLDER'
                />

                {success ? (
                    <TranslatableText
                        variant='body1'
                        english={`
                            If a account exists with this email,
                            a password reset link has been sent to it.
                        `}
                        bengali='BENGALI PLACEHOLDER'
                    />
                ) : (
                    <>
                        <TextField
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            sx={{ width: '85%' }}
                            disabled={resetPassword.isPending}
                            label={
                                <TranslatableText 
                                    variant='body1'
                                    english='Email' 
                                    bengali='BENGALI PLACEHOLDER'
                                />
                            }
                        />

                        <Button
                            sx={{ width: '90%', height: '3rem' }}
                            variant='contained'
                            onClick={handlePasswordReset}
                            disabled={resetPassword.isPending || !email}
                        >
                            <TranslatableText 
                                variant='body1'
                                english={
                                    resetPassword.isPending ?
                                        'Sending...' :
                                        'Send Reset Link'
                                }
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </Button>

                        {error && (
                            <TranslatableText
                                variant='body1'
                                error={true}
                                english={error}
                                bengali='BENGALI PLACEHOLDER'
                            />
                        )}
                    </>
                )}
            </Card>
        </>
    );
}

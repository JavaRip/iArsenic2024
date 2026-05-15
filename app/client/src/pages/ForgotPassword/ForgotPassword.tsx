import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import TranslatableText from "../../components/TranslatableText";
import { useAuth } from "../../hooks/useAuth/useAuth";
import PageCard from "../../components/PageCard";

export default function ForgotPassword(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const auth = useAuth()
    const { forgotPassword } = auth

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    async function handlePasswordReset() {
        try {
            await forgotPassword.mutateAsync(email);
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
        <Stack width="100%" alignItems="center" justifyContent="center">
            <PageCard>
                <TranslatableText
                    mb='1rem'
                    textAlign="center"
                    variant='h4'
                    english='Forgot Password'
                    bengali='পাসওয়ার্ড ভুলে গেছেন'
                />

                {error && (
                    <TranslatableText
                        variant='body1'
                        error={true}
                        english={error}
                        bengali={error} // todo provide translated error
                    />
                )}

                {success ? (
                    <TranslatableText
                        variant='body1'
                        english={`
                            Reset email password sent successfully.
                            Email may take 30 minutes or more to arrive,
                            please check spam and junk mail.
                        `}
                        bengali={`
                            পাসওয়ার্ড রিসেট ইমেইল সফলভাবে পাঠানো হয়েছে।
                            ইমেইল আসতে ৩০ মিনিট বা তার বেশি সময় লাগতে পারে,
                            অনুগ্রহ করে স্প্যাম এবং জাঙ্ক মেইল চেক করুন।
                        `}
                    />
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={forgotPassword.isPending}
                            label={
                                <TranslatableText
                                    variant='body1'
                                    english='Email'
                                    bengali='ইমেইল'
                                />
                            }
                        />

                        <Button
                            sx={{ height: '4rem' }}
                            fullWidth
                            variant='contained'
                            onClick={handlePasswordReset}
                            disabled={forgotPassword.isPending || !email}
                        >
                            <TranslatableText
                                variant='body1'
                                english={
                                    forgotPassword.isPending ?
                                        'Sending...' :
                                        'Send Reset Link'
                                }
                                bengali={
                                    forgotPassword.isPending ?
                                        'পাঠানো হচ্ছে...' :
                                        'রিসেট লিংক পাঠান'
                                }
                            />
                        </Button>
                    </Stack>
                )}
            </PageCard>
        </Stack>
    );
}

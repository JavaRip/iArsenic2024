import { useState, useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useRoute } from "wouter";
import TranslatableText from "../../components/TranslatableText";
import { navigate } from "wouter/use-browser-location";
import { useAuth } from "../../hooks/useAuth/useAuth";

export default function Review() {
    const [, params] = useRoute('/verify-email/:id');
    const verifyEmailToken = params?.id;

    const auth = useAuth()
    const { verifyEmail } = auth

    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function verifyEmailEffect() {
            if (!verifyEmailToken) {
                setError('No verify email token in url')
                return
            }

            await verifyEmail.mutateAsync({ verifyEmailToken })
        }

        verifyEmailEffect()
    }, [verifyEmailToken])

    useEffect(() => {
        if (
            !verifyEmail.isSuccess
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
        verifyEmail.isSuccess,
        navigate,
    ])

    return (
        <Stack width="100%" alignItems="center" justifyContent="center">
            <TranslatableText 
                mb='1rem' 
                textAlign='center' 
                variant='h4'
                english='Verify Email'
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

            {verifyEmail.isSuccess && (
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
        </Stack>
    );
}

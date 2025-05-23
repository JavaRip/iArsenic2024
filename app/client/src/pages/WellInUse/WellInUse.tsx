import { Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { navigate } from "wouter/use-browser-location";
import { useState } from "react";
import { useRoute } from "wouter";
import { useAccessToken } from "../../utils/useAccessToken";

export default function(): JSX.Element {
    const [, params] = useRoute('/well/:id/well-in-use');
    const wellId = params?.id;
    const { data: token } = useAccessToken()

    const [wellInUse, setWellInUse] = useState<boolean>();
    const [error, setError] = useState<boolean>(false);

    function handleWellInUseChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newBool = event.target.value === 'yes';
        setWellInUse(newBool);
        setError(false);
    }

    return (
        <>
            <Typography marginBottom='1rem' textAlign='center' variant='h4'>
                Well in use
            </Typography>

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
                }}
            >
                <Typography variant='h6'>
                    Is anyone drinking from this well?
                </Typography>

                <FormControl
                    error={error}
                    sx={{
                        width: 'max-content',
                        padding: '1rem',
                        borderRadius: '5px',
                        outline: error ? '1px solid red' : 'none',
                    }}
                >
                    <RadioGroup
                        name="anyone-drinking-selector"
                        value={wellInUse}
                        onChange={handleWellInUseChange}
                    >
                        <Stack direction='row' columnGap={3}>
                            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                            <FormControlLabel value='no' control={<Radio />} label='No' />
                        </Stack>
                    </RadioGroup>
                </FormControl>
                {error && (
                    <Typography color='error'>
                        Please select an option
                    </Typography>
                )}
            </Card>

            <Button
                sx={{ width: '90%', height: '4rem' }}
                variant='contained'
                onClick={async () => {
                    if (wellInUse === undefined) {
                        setError(true);
                        return;
                    }

                    const body = { wellInUse };
                    const headers: HeadersInit = {};

                    if (token) {
                        headers['authorization'] = `Bearer ${token.id}`;
                    }

                    const res = await fetch(`/api/v1/self/well/${wellId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers,
                        },
                        body: JSON.stringify(body),
                    });

                    if (!res.ok) {
                        console.error('Failed to update well:', res);
                        return;
                    }

                    if (token) {
                        navigate(`/well/${wellId}/upload-image`);
                    } else {
                        navigate(`/well/${wellId}/review`);
                    }
                }}
            >
                Next Steps
            </Button>
        </>
    );
}

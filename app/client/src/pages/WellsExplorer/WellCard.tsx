import { Card, Box, Stack } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { navigate } from 'wouter/use-browser-location';
import { useEffect, useState } from 'react';
import TranslatableText from '../../components/TranslatableText';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { Well } from '../../models';
import { predictionToRiskFactor } from '../../utils/predictionToRiskFactor';

interface Props {
    well: Well;
}

export default function WellCard({ well }: Props): JSX.Element {
    const auth = useAuth()
    const { data: token } = auth.getAccessToken

    const [thumbnailUrl, setThumbnailUrl] = useState<string>();
    
    // todo add getImages to useWells hook
    useEffect(() => {
        async function fetchSignedUrl() {
            try {
                const headers: HeadersInit = {};

                if (token) {
                    headers["Authorization"] = `Bearer ${token.id}`;
                }

                const paths = well.imagePaths ?? [];

                if (paths.length === 0) {
                    return;
                }

                const res = await fetch(`/api/v1/self/well/${well.id}/signed-image-urls`, {
                    method: "POST",
                    headers: {
                        ...headers,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ paths }),
                });

                if (!res.ok) {
                    const text = await res.text();
                    console.error("Failed to fetch signed URLs:", text);
                    return;
                }

                const { urls } = await res.json();
                setThumbnailUrl(urls[0]);
            } catch (error) {
                console.error(error);
                console.error('error fetching thumbnail url');
            }
        }

        fetchSignedUrl();
    }, [well]);

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 2,
                cursor: 'pointer',
                width: '100%',
            }}
            onClick={() => navigate(`/well/${well.id}`)}
        >
            <Stack 
                direction='row' 
                width='100%' 
                justifyContent='space-between'
            >
                <Box>
                    <TranslatableText 
                        english={(() => {
                            if (well.district && well.division) {
                                return (
                                    <>
                                        <strong>Region</strong> {well.district} - {well.division}
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <strong>Region</strong> Not Provided
                                    </>
                                )
                            }
                        })()} 
                        bengali='BENGALI PLACEHOLDER' 
                        variant='subtitle2'
                    />

                    <TranslatableText 
                        english={(() => {
                            if (well.modelOutput === undefined) {
                                return (
                                    <>
                                        <strong>Risk Assesment</strong> Missing Data
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <strong>Risk Assesment </strong> {
                                            predictionToRiskFactor(well.riskAssesment).english
                                        }
                                    </>
                                )
                            }
                        })()} 
                        bengali='BENGALI PLACEHOLDER' 
                        variant='subtitle2'
                    />

                    <TranslatableText 
                        english={(() => {
                            if (well.wellInUse) {
                                return (
                                    <>
                                        <strong>Well in Use</strong> Yes
                                    </>
                                )
                            } else if (well.wellInUse === false) {
                                return (
                                    <>
                                        <strong>Well in Use</strong> No
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <strong>Well in Use</strong> Usage Not Provided
                                    </>
                                )
                            }
                        })()} 
                        bengali='BENGALI PLACEHOLDER' 
                        variant='subtitle2'
                    />

                    <TranslatableText 
                        english={(() => {
                            if (well.staining === 'not sure') {
                                if (well.utensilStaining === 'red') {
                                    return (
                                        <>
                                            <strong>Staining</strong> Red
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <strong>Staining</strong> Black
                                        </>
                                    )
                                }
                            } else if (well.staining === 'red') {
                                return (
                                    <>
                                        <strong>Staining</strong> Red
                                    </>
                                )
                            } else if (well.staining === 'black') {
                                return (
                                    <>
                                        <strong>Staining</strong> Black
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <strong>Staining</strong> Not Provided
                                    </>
                                )
                            }
                        })()} 
                        bengali='BENGALI PLACEHOLDER' 
                        variant='subtitle2'
                    />

                    <TranslatableText 
                        english={(() => {
                            return (
                                <>
                                    <strong>Created At</strong> {well.createdAt.toLocaleDateString()}
                                </>
                            )
                        })()} 
                        bengali='BENGALI PLACEHOLDER' 
                        variant='subtitle2'
                    />

                    <TranslatableText 
                        english={`${well.id}`} 
                        bengali={`${well.id}`}
                        variant='subtitle2'
                        color='gray'
                        fontStyle='italic'
                        sx={{ mt: 2 }}
                    />
                </Box>

                <Stack
                    width='120px'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f0f0f0',
                        }}
                    >
                        {thumbnailUrl ? (
                            <img
                                src={thumbnailUrl}
                                alt="Well"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <ImageIcon sx={{ fontSize: 40, color: '#999' }} />
                        )}
                    </Box>
                </Stack>
            </Stack>
        </Card>
    );
}

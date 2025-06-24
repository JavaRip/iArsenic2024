import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import Map from '../Map'

const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
    rowGap: '3rem',
    position: 'relative',
};

type props = {
    title: ReactNode;
    texts: ReactNode[];
    imageConfig?: {
        imageUrl: string;
        imageSide: 'left' | 'right';
        imageAlt: string;
    };
    backgroundColor: string;
    maxTextWidth: string;
    textAlign?: 'center' | 'left' | 'right' | 'justify';
    imageBorderRadius?: string;
    appendage?: JSX.Element;
};

export default function Section({
    backgroundColor,
    title,
    texts,
    imageConfig,
    maxTextWidth,
    textAlign,
    appendage,
}: props): JSX.Element {
    return (
        <Box sx={{ ...sectionStyle, backgroundColor }} px={{ xs: 1, sm: 1, md: 4 }}>
            {title}

            <Stack
                direction={{
                    md: 'column-reverse',
                    lg: imageConfig?.imageSide === 'right' ? 'row-reverse' : 'row',
                }}
                alignItems='center'
                justifyContent='center'
            >
                <Box maxWidth={{ md: '100%', lg: maxTextWidth }}>
                    {texts.map((text, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: textAlign ?? 'justify',
                            }}
                            mx={{ xs: 1, sm: 1, md: 4 }}
                        >
                            {text}
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        height: '600px',
                        width: '600px',
                        position: 'relative',
                    }} 
                >
                    <img
                        src='/splashPage/interactive_map.png'
                        alt='Interactive map of Bangladesh'
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                        }}
                    />
                    <Map 
                        containerSx={{ 
                            borderRadius: '12px', 
                            boxShadow: 3,
                            height: '100%',
                            width: '100%',
                        }}
                        hideInterface={true}
                        disablePointerEvents={true}
                    />
                </Box>
            </Stack>

            {appendage}
        </Box>
    );
}


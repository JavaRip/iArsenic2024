import { Stack, Typography, Button } from "@mui/material";
import { navigate } from "wouter/use-browser-location";
import CloseIcon from '@mui/icons-material/Close';

interface props {
    setOpen: (open: boolean) => void
}

export default function Banner({
    setOpen,
}: props) {
    return (
        <Stack
            height='48px'
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
                bgcolor: 'primary.main',
                color: 'secondary.main',
            }}
        >
            <Typography 
                onClick={() => navigate(`/`)}
                ml='16px' 
                variant='h6'
                sx={{
                    cursor: 'pointer',
                }}
            >
                iArsenic
            </Typography>
            <Button 
                onClick={() => setOpen(false)}
            >
                <CloseIcon sx={{ color: 'secondary.main' }} />
            </Button>
        </Stack>
    )
}
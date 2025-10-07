import { Stack, Fab } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface props {
    open: boolean
    setOpen: (open: boolean) => void
}

export default function Fabs({ open, setOpen }: props) {
    return (
        <Stack 
            sx={{
                position: 'fixed',
                right: '48px',
                bottom: '48px',
                width: '48px',
                zIndex: 1000,
                cursor: 'pointer',
                gap: '16px',
            }}
        >
            <Fab 
                size='medium'
                color='primary'
                onClick={() => window.history.back()}
            >
                <KeyboardReturnIcon/>
            </Fab>
            <Fab
                size='medium'
                color='primary'
                onClick={() => setOpen(!open)}
            >
                <SettingsIcon/>
            </Fab>
        </Stack>
    )
}
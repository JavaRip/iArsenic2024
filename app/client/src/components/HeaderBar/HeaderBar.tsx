import { AppBar, Stack, Typography, Box, IconButton, Button, Avatar } from '@mui/material';
import { navigate } from 'wouter/use-browser-location';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import NavMenu from './NavMenu';
import { useAuth } from '../../hooks/useAuth/useAuth';
import TranslatableText from '../TranslatableText';
import { useUsers } from '../../hooks/useUser';

export default function HeaderBar(): JSX.Element {
    const auth = useAuth()
    const { data: token } = auth.getAccessToken
    const { getUser } = useUsers()

    const {
        data: user,
        // isLoading: userLoading,
        // isError: userIsError,
        // error: userError,
    } = getUser(token?.userId)

    const [open, setOpen] = useState(false);
    console.log(user)

    return (
        <AppBar sx={{ marginBottom: '2rem', height: '3rem' }} position='static'>
            <Stack
                paddingLeft='2rem'
                paddingRight='2rem'
                margin='auto'
                width='100%'
                maxWidth='50em'
                justifyContent='space-between'
                direction='row'
                alignItems='center'
            >
                <Stack direction='row' alignItems='center'>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={() => setOpen(true)}
                        edge='start'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <NavMenu
                        open={open}
                        setOpen={setOpen}
                        role={user?.type}
                    />

                    <Typography
                        sx={{ cursor: 'pointer' }}
                        variant='h6'
                        onClick={() => navigate(`/`)}
                    >
                        iArsenic
                    </Typography>
                </Stack>

                <Box>
                    {user && (
                        <Button
                            variant='outlined'
                            onClick={() => navigate('/profile')}
                            sx={{
                                padding: '8px',
                                minWidth: 'auto',
                                color: 'whitesmoke',
                                borderColor: 'whitesmoke',
                            }}
                        >
                            <TranslatableText
                                variant='body1'
                                english='My Account'
                                bengali='BENGALI PLACEHOLDER'
                            />
                            {
                                user.avatarUrl ?
                                    <Avatar 
                                        src={user.avatarUrl}
                                        sx={{
                                            height: '28px',
                                            width: '28px',
                                            mr: '12px',
                                        }}
                                    /> :
                                    <AccountCircleIcon 
                                        sx={{
                                            height: '28px',
                                            width: '28px',
                                            mr: '12px',
                                        }}
                                    />
                            }
                        </Button>
                    )}
                </Box>
            </Stack>
        </AppBar>
    );
}

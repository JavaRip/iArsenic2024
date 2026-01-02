import { Box, Button, Stack } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PageCard from '../../components/PageCard';
import TranslatableText from '../../components/TranslatableText';
import { User } from '../../models';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { navigate } from 'wouter/use-browser-location';

interface Props {
    user: User;
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileCard({ user, setEditMode }: Props): JSX.Element {
    const logout = useAuth().logout

    async function handleLogout() {
        try {
            await logout.mutateAsync();
            navigate('/landing');
            location.reload()
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <Box width='100%'>
           <TranslatableText 
                width='100%'
                textAlign='center' 
                variant='h4'
                mb='1rem'
                english='Profile Page'
                bengali='BENGALI PLACEHOLDER'
            />

            <PageCard>
                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Name</strong> {user.name}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Email</strong> {user.email}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Email Verified</strong> {user.emailVerified ? "Yes" : "No"}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>User Type</strong> {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Member Since</strong> {user.createdAt.toLocaleDateString()}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Language</strong> {user.language}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Units System</strong> {user.units}
                        </>
                    }
                    bengali='BENGALI PLACEHOLDER'
                />

                <Stack width='100%' direction='row' justifyContent='space-between'>
                    <Button
                        variant='outlined'
                        startIcon={<CreateIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => setEditMode(true)}
                    >
                        <TranslatableText 
                            width='100%'
                            variant='body1'
                            english='Edit Profile'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Button>

                    <Button
                        variant='outlined'
                        startIcon={<LogoutIcon sx={{ color: 'error.main' }} />}
                        sx={{ 
                            mt: 2,
                            borderColor: 'error.main',
                            color: 'error.main',
                        }}
                        onClick={handleLogout}
                    >
                        <TranslatableText 
                            width='100%'
                            variant='body1'
                            english='Logout'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Button>
                </Stack>
            </PageCard>
        </Box>
    );
}

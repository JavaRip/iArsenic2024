import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { useRoute } from 'wouter';
import { useUsers } from '../../hooks/useUsers/useUsers';
import { useWells } from '../../hooks/useWells/useWells';
import { useAuth } from '../../hooks/useAuth/useAuth';
import TranslatableText from '../../components/TranslatableText';
import PageCard from '../../components/PageCard';
import WellCard from '../WellsExplorer/WellCard';

export default function UserProfile(): JSX.Element {
    const [, params] = useRoute('/user/:id');
    const userId = params?.id;

    const auth = useAuth();
    const { data: token, isLoading: tokenLoading } = auth.getAccessToken;

    const { getUser } = useUsers();
    const { data: currentUser, isLoading: currentUserLoading } = getUser(token?.userId);
    const { data: profileUser, isLoading: profileLoading } = getUser(userId);

    const { getWells } = useWells();
    const { data: wells, isLoading: wellsLoading } = getWells();

    if (tokenLoading || currentUserLoading || profileLoading || wellsLoading) {
        return (
            <Stack alignItems='center' mt={4}>
                <CircularProgress />
            </Stack>
        );
    }

    if (!currentUser || currentUser === 'guest' || currentUser.type !== 'admin') {
        return (
            <Box width='100%' textAlign='center' mt={4}>
                <TranslatableText
                    width='100%'
                    variant='h6'
                    english='Access denied. Admin only.'
                    bengali='প্রবেশাধিকার নেই। শুধুমাত্র প্রশাসকের জন্য।'
                />
            </Box>
        );
    }

    if (!profileUser || profileUser === 'guest') {
        return (
            <Box width='100%' textAlign='center' mt={4}>
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english='User not found.'
                    bengali='ব্যবহারকারী পাওয়া যায়নি।'
                />
            </Box>
        );
    }

    const initials = profileUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const userWells = (wells ?? []).filter((w) => w.userId === userId);

    return (
        <Box width='100%'>
            <TranslatableText
                width='100%'
                textAlign='center'
                variant='h4'
                mb='1.5rem'
                english='User Profile'
                bengali='ব্যবহারকারীর প্রোফাইল'
            />

            {/* Avatar & name */}
            <Stack alignItems='center' mb={3}>
                <Avatar
                    src={profileUser.avatarUrl}
                    sx={{ width: 96, height: 96, fontSize: '2rem' }}
                >
                    {!profileUser.avatarUrl && initials}
                </Avatar>
                <Typography variant='h6' mt={1.5}>{profileUser.name}</Typography>
                <Typography variant='body2' color='text.secondary'>{profileUser.email}</Typography>
            </Stack>

            {/* Info card */}
            <PageCard>
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Account Type: </strong>{profileUser.type === 'admin' ? 'Admin' : 'User'}</>}
                    bengali={<><strong>অ্যাকাউন্টের ধরন: </strong>{profileUser.type === 'admin' ? 'প্রশাসক' : 'ব্যবহারকারী'}</>}
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Email Verified: </strong>{profileUser.emailVerified ? 'Yes' : 'No'}</>}
                    bengali={<><strong>ইমেইল যাচাই: </strong>{profileUser.emailVerified ? 'হ্যাঁ' : 'না'}</>}
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Member Since: </strong>{profileUser.createdAt.toLocaleString('en-GB', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            })}
                        </>
                    }
                    bengali={
                        <>
                            <strong>সদস্যতার তারিখ: </strong>{profileUser.createdAt.toLocaleString('bn-BD', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            })}
                        </>
                    }
                />
                <Stack direction='row' gap={1} alignItems='center' mt={1}>
                    <Chip
                        label={profileUser.type === 'admin' ? 'Admin' : 'User'}
                        size='small'
                        color={profileUser.type === 'admin' ? 'primary' : 'default'}
                    />
                    <Chip
                        label={profileUser.emailVerified ? '✓ Verified' : '✗ Unverified'}
                        size='small'
                        color={profileUser.emailVerified ? 'success' : 'warning'}
                        variant='outlined'
                    />
                </Stack>
            </PageCard>

            {/* Wells */}
            <TranslatableText
                variant='h5'
                mt={3}
                mb={1}
                english={`Wells (${userWells.length})`}
                bengali={`কূপ (${userWells.length})`}
            />

            {userWells.length === 0 ? (
                <TranslatableText
                    variant='body2'
                    color='text.secondary'
                    english='No wells uploaded by this user.'
                    bengali='এই ব্যবহারকারী কোনো কূপ আপলোড করেননি।'
                />
            ) : (
                <Box width='100%'>
                    {userWells.map((well) => (
                        <WellCard key={well.id} well={well} />
                    ))}
                </Box>
            )}
        </Box>
    );
}

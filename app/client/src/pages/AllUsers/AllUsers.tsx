import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { navigate } from 'wouter/use-browser-location';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { useUsers } from '../../hooks/useUsers/useUsers';
import TranslatableText from '../../components/TranslatableText';

export default function AllUsers(): JSX.Element {
    const auth = useAuth();
    const { data: token, isLoading: tokenLoading } = auth.getAccessToken;

    const { getUser, getUsers } = useUsers();
    const { data: currentUser, isLoading: currentUserLoading } = getUser(token?.userId);
    const { data: users, isLoading: usersLoading, isError } = getUsers();

    if (tokenLoading || currentUserLoading) {
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

    if (usersLoading) {
        return (
            <Stack alignItems='center' mt={4}>
                <CircularProgress />
            </Stack>
        );
    }

    if (isError || !users) {
        return (
            <Box width='100%' textAlign='center' mt={4}>
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english='Failed to load users. Please try again.'
                    bengali='ব্যবহারকারীদের লোড করা যায়নি। আবার চেষ্টা করুন।'
                />
            </Box>
        );
    }

    return (
        <Stack width="100%" alignItems="center" justifyContent="center">
            <TranslatableText
                width='100%'
                textAlign='center'
                variant='h4'
                mb='1.5rem'
                english='All Users'
                bengali='সকল ব্যবহারকারী'
            />

            <Typography variant='body2' color='text.secondary' mb={2}>
                {users.length} user{users.length !== 1 ? 's' : ''}
            </Typography>

            <Stack>
                <TableContainer sx={{ width: '100%' }}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TranslatableText variant='body2' english='User' bengali='ব্যবহারকারী' />
                                </TableCell>
                                <TableCell>
                                    <TranslatableText variant='body2' english='Type' bengali='ধরন' />
                                </TableCell>
                                <TableCell>
                                    <TranslatableText variant='body2' english='Verified' bengali='যাচাই' />
                                </TableCell>
                                <TableCell>
                                    <TranslatableText variant='body2' english='Joined' bengali='যোগদান' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => {
                                const initials = user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2);

                                return (
                                    <TableRow
                                        key={user.id}
                                        hover
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/user/${user.id}`)}
                                    >
                                        <TableCell>
                                            <Stack direction='row' alignItems='center' gap={1}>
                                                <Avatar
                                                    src={user.avatarUrl}
                                                    sx={{ width: 32, height: 32, fontSize: '0.75rem' }}
                                                >
                                                    {!user.avatarUrl && initials}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant='body2' fontWeight={500}>
                                                        {user.name}
                                                    </Typography>
                                                    <Typography variant='caption' color='text.secondary'>
                                                        {user.email}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.type === 'admin' ? 'Admin' : 'User'}
                                                size='small'
                                                color={user.type === 'admin' ? 'primary' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.emailVerified ? '✓' : '✗'}
                                                size='small'
                                                color={user.emailVerified ? 'success' : 'warning'}
                                                variant='outlined'
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TranslatableText
                                                variant='caption'
                                                english={user.createdAt.toLocaleString('en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}
                                                bengali={user.createdAt.toLocaleString('bn-BD', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    );
}

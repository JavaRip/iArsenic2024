import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from 'iarsenic-types';
import AccessTokenRepo from '../../utils/AccessTokenRepo';
import { navigate } from 'wouter/use-browser-location';
import UserCard from './UserCard';

export default function AllUsers(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);

    async function fetchUsers() {
        const token = await AccessTokenRepo.get();

        if (!token) {
            navigate(`/login`);
            return;
        }

        try {
            const result = await fetch(`/api/v1/users`, {
                headers: {
                    authorization: `Bearer ${token.id}`,
                }
            });

            if (!result.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await result.json();
            setUsers(data.users);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Typography alignSelf='center' variant="h4">
                All Users
            </Typography>

            <Box
                sx={{
                    margin: '0 1rem 1rem 1rem',
                    padding: '1rem',
                }}
            >
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </Box>
        </>
    );
}

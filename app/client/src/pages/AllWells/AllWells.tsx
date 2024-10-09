import { Box, CircularProgress, Typography } from '@mui/material';
import UserWellCard from './UserWellCard';
import { useEffect, useState } from 'react';
import { Well, WellSchema, User } from 'iarsenic-types';
import AccessTokenRepo from '../../utils/AccessTokenRepo';
import { navigate } from 'wouter/use-browser-location';

interface WellData {
    wells: Well[];
    users: Record<string, User>;
}

export default function Review(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [wells, setWells] = useState<Well[]>([]);
    const [users, setUsers] = useState<Record<string, User>>({});

    async function fetchWellsAndUsers() {
        const token = await AccessTokenRepo.get();

        if (!token) {
            navigate(`/login`);
            return;
        }

        try {
            const result = await fetch(`/api/v1/wells`, {
                headers: {
                    authorization: `Bearer ${token.id}`,
                }
            });

            if (!result.ok) {
                throw new Error('Failed to fetch wells');
            }

            const data: WellData = await result.json();

            const parsedWells = data.wells.map((well: Well) =>
                WellSchema.parse({
                    ...well,
                    createdAt: new Date(well.createdAt),
                })
            );

            setWells(parsedWells);
            setUsers(data.users);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWellsAndUsers();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Typography alignSelf='center' variant="h4">
                All Wells
            </Typography>

            <Box
                sx={{
                    margin: '0 1rem 1rem 1rem',
                    padding: '1rem',
                }}
            >
                {wells.map((well) => (
                    <UserWellCard key={well.id} well={well} user={users[well.userId]} />
                ))}
            </Box>
        </>
    );
}

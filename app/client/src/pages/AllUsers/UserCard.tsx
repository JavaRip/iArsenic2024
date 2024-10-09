import { Card, CardContent, Typography, Box } from '@mui/material';
import { User } from 'iarsenic-types';

interface Props {
    user: User;
}

export default function UserCard({ user }: Props): JSX.Element {
    return (
        <Card
            variant="outlined"
            sx={{ marginBottom: '1.5rem', padding: '1rem', boxShadow: 2 }}
        >
            <CardContent>
                {/* User Details */}
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                    User ID: {user.id}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Name: {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Email Verified: {user.emailVerified ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Type: {user.type}
                </Typography>

                {/* Additional User Details */}
                <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Created At: {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Language: {user.language}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Units: {user.units}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

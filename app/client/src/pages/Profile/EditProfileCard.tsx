import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { User, UnitsSchema, LanguageSchema } from 'iarsenic-types';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useUnits } from '../../hooks/useUnits';
// import { useQueryClient } from '@tanstack/react-query';
import TranslatableText from '../../components/TranslatableText';
import PageCard from '../../components/PageCard';
// import { useAuth } from '../../hooks/useAuth/useAuth';

interface Props {
    user: User;
    setEditMode: (editMode: boolean) => void;
    setSaving: (saving: boolean) => void;
}

export default function EditProfileCard({ user, setEditMode }: Props): JSX.Element {
    // const queryClient = useQueryClient()

    const [name, setName] = useState<string>(user.name);

    // const auth = useAuth()
    // const { data: token } = auth.getAccessToken

    const { language, setLanguage } = useLanguage();
    const { units, setUnits } = useUnits();

    async function saveChanges() {
        throw new Error('unimplemented')
    }
    

    return (
        <Box width='100%'>
            <TranslatableText 
                width='100%'
                textAlign='center' 
                variant='h4' 
                gutterBottom
                english='Edit Profile'
                bengali='BENGALI PLACEHOLDER'
            />

            <PageCard gap='0'>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    label={
                        <TranslatableText 
                            width='100%'
                            variant='body1' 
                            english='Name'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    }
                />

                <TranslatableText 
                    width='100%'
                    mb='1rem'
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
                    mb='1rem'
                    variant='body1'
                    english={
                        <>
                            <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
                        </>
                    } 
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    mb='1rem'
                    variant='body1'
                    english={
                        <>
                            <strong>User Type:</strong> {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                        </>
                    } 
                    bengali='BENGALI PLACEHOLDER'
                />

                <TranslatableText 
                    width='100%'
                    mb='1rem'
                    variant='body1'
                    english={
                        <>
                            <strong>Created At:</strong> {user.createdAt}
                        </>
                    } 
                    bengali='BENGALI PLACEHOLDER'
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>
                        <TranslatableText 
                            width='100%'
                            variant='body1' 
                            english='Language'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </InputLabel>
                    <Select
                        value={language}
                        onChange={(e) => setLanguage(LanguageSchema.parse(e.target.value))}
                        label={
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='Language'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        }
                    >
                        <MenuItem value="english">
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='English'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                        <MenuItem value="bengali">
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='Bengali'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>
                        <TranslatableText 
                            width='100%'
                            variant='body1' 
                            english='Units System'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </InputLabel>
                    <Select
                        value={units}
                        onChange={(e) => setUnits(UnitsSchema.parse(e.target.value))}
                        label={
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='Units System'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        }
                    >
                        <MenuItem value="meters">
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='Meters'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>

                        <MenuItem value="feet">
                            <TranslatableText 
                                width='100%'
                                variant='body1' 
                                english='Feet'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                    </Select>
                </FormControl>

                <Box display="flex" justifyContent="space-between" mt={2} width='100%'>
                    <Button variant="contained" color="primary" onClick={saveChanges}>
                        <TranslatableText 
                            width='100%'
                            variant='body1' 
                            english='Save Changes'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Button>

                    <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>
                        <TranslatableText 
                            width='100%'
                            variant='body1' 
                            english='Cancel'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Button>
                </Box>
            </PageCard>
        </Box>
    );
}

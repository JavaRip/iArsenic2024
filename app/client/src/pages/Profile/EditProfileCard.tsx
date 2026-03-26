import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useUnits } from '../../hooks/useUnits';
import TranslatableText from '../../components/TranslatableText';
import PageCard from '../../components/PageCard';
import { User, LanguageSchema, UnitsSchema } from '../../models';
import { useUsers } from '../../hooks/useUsers/useUsers';

interface Props {
    user: User;
    setEditMode: (editMode: boolean) => void;
}

export default function EditProfileCard({ user, setEditMode }: Props): JSX.Element {
    const [name, setName] = useState(user.name);
    const { language, setLanguage } = useLanguage();
    const { units, setUnits } = useUnits();

    const { updateUser } = useUsers();
    const mutation = updateUser();

    async function handleSave() {
        const selectedLanguage = LanguageSchema.parse(language);
        const selectedUnits = UnitsSchema.parse(units);

        mutation.mutate(
            { userId: user.id, updates: { name, language: selectedLanguage, units: selectedUnits } },
            {
                onSuccess: () => {
                    setLanguage(selectedLanguage);
                    setUnits(selectedUnits);
                    setEditMode(false);
                },
            },
        );
    }

    const isPending = mutation.isPending;

    return (
        <Box width='100%'>
            <TranslatableText
                width='100%'
                textAlign='center'
                variant='h4'
                mb='1.5rem'
                english='Settings'
                bengali='BENGALI PLACEHOLDER'
            />

            <PageCard gap='0'>
                <SettingLabel english='Display Name' bengali='BENGALI PLACEHOLDER' />
                <TextField
                    fullWidth
                    variant='outlined'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isPending}
                    sx={{ mb: 3 }}
                />

                <SettingLabel english='Language' bengali='BENGALI PLACEHOLDER' />
                <FormControl fullWidth sx={{ mb: 3 }} disabled={isPending}>
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
                        <MenuItem value='english'>
                            <TranslatableText
                                width='100%'
                                variant='body1'
                                english='English'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                        <MenuItem value='bengali'>
                            <TranslatableText
                                width='100%'
                                variant='body1'
                                english='Bengali'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                    </Select>
                </FormControl>

                <SettingLabel english='Units System' bengali='BENGALI PLACEHOLDER' />
                <FormControl fullWidth sx={{ mb: 3 }} disabled={isPending}>
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
                        <MenuItem value='meters'>
                            <TranslatableText
                                width='100%'
                                variant='body1'
                                english='Meters'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                        <MenuItem value='feet'>
                            <TranslatableText
                                width='100%'
                                variant='body1'
                                english='Feet'
                                bengali='BENGALI PLACEHOLDER'
                            />
                        </MenuItem>
                    </Select>
                </FormControl>

                {mutation.isError && (
                    <Alert severity='error' sx={{ mb: 2, width: '100%' }}>
                        <TranslatableText
                            width='100%'
                            variant='body2'
                            english='Failed to save settings. Please try again.'
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Alert>
                )}

                <Stack direction='row' justifyContent='space-between' width='100%' mt={1}>
                    <Button
                        variant='contained'
                        onClick={handleSave}
                        disabled={isPending}
                        startIcon={isPending ? <CircularProgress size={16} color='inherit' /> : undefined}
                    >
                        <TranslatableText
                            width='100%'
                            variant='body1'
                            english={isPending ? 'Saving…' : 'Save'}
                            bengali='BENGALI PLACEHOLDER'
                        />
                    </Button>
                </Stack>
            </PageCard>
        </Box>
    );
}

function SettingLabel({ english, bengali }: { english: string; bengali: string }) {
    return (
        <TranslatableText
            width='100%'
            variant='body2'
            mb={1}
            english={<Typography variant='body2' color='text.secondary' fontWeight={600}>{english}</Typography>}
            bengali={bengali}
        />
    );
}

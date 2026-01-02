import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { navigate } from 'wouter/use-browser-location';

import WellCard from './WellCard';
import { useDropdownData } from '../../hooks/useDropdownData';
import Filter from './Filter';
import TranslatableText from '../../components/TranslatableText';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { useWells } from '../../hooks/useWells/useWells';
import { FiltersType } from './FiltersType';
import { useUsers } from '../../hooks/useUsers/useUsers';
import applyFilter from './utils/applyFilter';

export default function WellsExplorer(): JSX.Element {
    const [page, setPage] = useState<number>(1)
    const [pageSize/*, setPageSize*/] = useState<number>(25)

    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [filters, setFilters] = useState<FiltersType>({
        wellInUse: false,
        flooding: 'any',
        staining: 'any',
        geolocated: false,
        hasImages: false,
        complete: false,
        aboveDepth: 0,
        belowDepth: 500,
        ownWells: false,
        guestWells: 'any',
        region: {
            division: '',
            district: '',
            upazila: '',
            union: '',
            mouza: '',
        },
    });

    const { createWell, getWells } = useWells();
    const createWellMutation = createWell();
    const { 
        data: wells,
        isLoading: wellsLoading,
        isError: isWellsError,
        error: wellsError
    } = getWells();

    const auth = useAuth()
    const { 
        data: token,
        isLoading: tokenLoading,
        isError: isTokenError,
        error: tokenError,
    } = auth.getAccessToken

    const {
        data: dropdownData, 
        isLoading: isDropdownLoading,
        isError: isDropdownError,
        error: dropdownError,
    } = useDropdownData();

    const { getUser } = useUsers()

    const {
        data: user,
        isLoading: userLoading,
        isError: isUserError,
        error: userError,
    } = getUser(token?.userId)

    async function addWell() {
        try {
            const newWell = await createWellMutation.mutateAsync(undefined)
            navigate(`/well/${newWell.id}`)
        } catch (err) {
            console.error('Failed to create well: ', err)
            throw err
        }
    }

    if (
        isDropdownLoading ||
        wellsLoading ||
        userLoading ||
        tokenLoading
    ) {
        return (
            <Stack
                direction="column"
                alignContent="center"
                justifyContent="center"
            >
                <CircularProgress />
            </Stack>
        )
    }

    if (
        isDropdownError ||
        isWellsError ||
        isUserError ||
        isTokenError
    ) {
        console.error(wellsError)
        console.error(dropdownError)
        console.error(userError)
        console.error(tokenError)

        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

    useEffect(() => {
        setPage(1)
    }, [filters])

    const filteredWells = applyFilter(
        filters,
        wells!,
        user?.id,
    )

    const totalPages = Math.ceil(filteredWells.length / pageSize)

    return (
        <>
            <TranslatableText 
                english='Wells Explorer' 
                bengali='BENGALI PLACEHOLDER'
                textAlign='center'
                variant='h4'
            />

            <Button onClick={addWell} variant="contained">
                <TranslatableText
                    variant='body1'
                    english='Add Well'
                    bengali='BENGALI PLACEHOLDER'
                />
            </Button>

            {token && dropdownData && (
                <Filter
                    dropdownData={dropdownData}
                    filters={filters}
                    setFilters={setFilters}
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                />
            )}

            <Box
                sx={{ 
                    margin: '0 1rem 1rem 1rem', 
                    padding: '1rem', 
                    width: '100%',
                }}
            >
                {(
                    wells!.length === 0
                ) ? (
                    <TranslatableText
                        variant='body1'
                        english='No wells found' 
                        bengali='BENGALI PLACEHOLDER' 
                    />
                ) : (
                    filteredWells
                    .slice(
                        (page - 1) * pageSize,
                        page * pageSize
                    )
                    .map(w => (
                        <WellCard
                            key={w.id}
                            well={w}
                        />
                    ))
                )}
            </Box>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ my: 2 }}
                width='100%'
            >
                <Button
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    Previous
                </Button>

                <Typography>
                    Page {page} of {totalPages}
                </Typography>

                <Button
                    variant="outlined"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                >
                    Next
                </Button>
            </Stack>
        </>
    );
}

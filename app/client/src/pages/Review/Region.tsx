import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Well } from "iarsenic-types";
import { navigate } from "wouter/use-browser-location";
import PageCard from "../../components/PageCard";
import TranslatableText from "../../components/TranslatableText";
import { useRegionTranslations } from "../../hooks/useRegionTranslations";

interface props {
    well: Well;
}

export default function({ well }: props) {
    if (!well?.division) {
        throw new Error('Missing region');
    }

    const {
        data: regionTranslations,
        isLoading: isTranslationsLoading,
        isError: isTranslationsError,
    } = useRegionTranslations();

    if (isTranslationsLoading) {
        return (
            <Stack direction='column' alignContent='center' justifyContent='center'>
                <CircularProgress />
            </Stack>
        );
    }

    if (
        isTranslationsError
    ) {
        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

    return (
        <PageCard>
            <Stack width='100%'>
                <TranslatableText
                    variant="h6"
                    mb='1rem'
                    english='Region'
                    bengali='অঞ্চল'
                />

                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>Division</strong> {well.division}
                    </>}
                    bengali={<>
                        <strong>{regionTranslations!.Divisions.division}</strong> {regionTranslations!.Divisions[well.division.toLowerCase()]}
                    </>}
                />

                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>District</strong> {well.district}
                    </>}
                    bengali={<>
                        <strong>{regionTranslations!.Districts.district}</strong> {regionTranslations!.Districts[(well.district as string).toLowerCase()]}
                    </>}
                />


                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>Upazila</strong> {well.upazila}
                    </>}
                    bengali={<>
                        <strong>{regionTranslations!.Upazilas.upazila}</strong> {regionTranslations!.Upazilas[(well.upazila as string).toLowerCase()]}
                    </>}
                />

                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>Union</strong> {well.union}
                    </>}
                    bengali={<>
                        <strong>{regionTranslations!.Unions.union}</strong> {regionTranslations!.Unions[(well.union as string).toLowerCase()]}
                    </>}
                />

                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>Mouza</strong> {well.mouza}
                    </>}
                    bengali={<>
                        <strong>{regionTranslations!.Mouzas.mouza}</strong> {regionTranslations!.Mouzas[(well.mouza as string).toLowerCase()]}
                    </>}
                />

                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        sx={{ width: '80%', height: '3rem' }}
                        variant="outlined"
                        onClick={() => {
                            navigate(`/well/${well.id}/region?returnToReview=true`);
                        }}
                    >
                        <TranslatableText
                            variant="body1"
                            english='Edit Region'
                            bengali='অঞ্চল সম্পাদন করুন'
                        />
                    </Button>
                </Box>
            </Stack>
        </PageCard>
    );
}
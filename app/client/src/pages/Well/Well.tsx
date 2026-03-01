import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useRoute } from 'wouter';
import { User, Well } from '../../models';
import { useWells } from "../../hooks/useWells/useWells";
import WellSummaryCard from './components/WellSummaryCard';
import ActionLogCard from './components/ActionLogCard';
import MapCard from './components/MapCard';
import MissingDataCard from './components/MissingDataCard';
import RiskAssesmentCard from './components/RiskAssesmentCard';
import PhotoCard from './components/PhotoCard';
import { useRegionTranslations } from '../../hooks/useRegionTranslations';
import TranslatableText from '../../components/TranslatableText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUsers } from '../../hooks/useUsers/useUsers';
import { useUnits } from '../../hooks/useUnits';

export default function WellPage() {
    const [, params] = useRoute('/well/:id');
    const wellId = params?.id;

    const { getWell } = useWells();

    const {
        data: well,
        isLoading: wellLoading,
        error: wellError,
    } = getWell(wellId);

    const {
        data: regionTranslations,
        isLoading: rtLoading,
        error: rtError,
    } = useRegionTranslations()

    const { getUser } = useUsers()
    const {
        data: user,
        isLoading: userLoading,
        isError: userIsError,
        error: userError,
    } = getUser(well?.userId)

    function getMissingFields(well: Well): { missingFields: string[], allFieldsMissing: boolean } {
        const requiredFields: (keyof Well)[] = [
            'division',
            'depth',
            'staining',
            'wellInUse',
            'flooding',
        ];

        let allFieldsMissing = true;
        const missingFields = [];
        for (const f of requiredFields) {
            if (well[f] == null) {
                missingFields.push(f);
            } else {
                allFieldsMissing = false;
            }
        }

        return { missingFields, allFieldsMissing };
    }

    const { getUnits } = useUnits()

    if (
        wellLoading ||
        rtLoading ||
        userLoading
    ) {
        return (
            <CircularProgress />
        );
    }

    if (
        !wellId ||
        userIsError ||
        wellError ||
        rtError
    ) {
        console.error(userError)
        console.error(wellError)
        console.error(userError)

        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

    const { missingFields, allFieldsMissing } = getMissingFields(well!);

    return (
        <>
            <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                sx={{ alignSelf: 'start' }}
                onClick={() => window.history.back()}
            >
                <TranslatableText
                    variant='body1'
                    textAlign='center'
                    english='Return'
                    bengali='ফিরে যান' // chatgpt generated
                />
            </Button>

            <ActionLogCard
                wellId={wellId}
            />

            {missingFields.length > 0 && (
                <MissingDataCard
                    wellId={wellId}
                    missingFields={missingFields}
                />
            )}

            <WellSummaryCard
                userEmail={user === 'guest' ? 'guest' : user!.email}
                well={well!}
                rt={regionTranslations!}
                units={getUnits()}
            />

            {well!.riskAssesment && (
                <RiskAssesmentCard
                    riskAssesment={well!.riskAssesment}
                />
            )}

            {(well!.geolocation || well!.mouzaGeolocation) && (
                <MapCard
                    regionTranslations={regionTranslations!}
                    geolocation={well!.geolocation || well!.mouzaGeolocation!}
                    well={well!}
                    geolocationType={well!.geolocation ? 'gps' : 'mouza'}
                />
            )}

            <PhotoCard
                wellId={wellId!}
            />
        </>
    );
}


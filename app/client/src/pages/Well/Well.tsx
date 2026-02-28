import { CircularProgress } from '@mui/material';
import { useRoute } from 'wouter';
import { Well } from '../../models';
import { useWells } from "../../hooks/useWells/useWells";
import WellSummaryCard from './components/WellSummaryCard';
import ActionLogCard from './components/ActionLogCard';
import MapCard from './components/MapCard';
import MissingDataCard from './components/MissingDataCard';
import RiskAssesmentCard from './components/RiskAssesmentCard';
import PhotoCard from './components/PhotoCard';
import { useRegionTranslations } from '../../hooks/useRegionTranslations';

export default function WellPage() {
    const [, params] = useRoute('/well/:id');
    const wellId = params?.id;

    const { getWell } = useWells();
    const { data: well, isLoading } = getWell(wellId);

    const {
        data: regionTranslations,
        isLoading: rtLoading,
        error: rtError,
    } = useRegionTranslations()

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

    if (!wellId || !well || isLoading || rtLoading) {
        return (
            <CircularProgress />
        );
    }

    const { missingFields, allFieldsMissing } = getMissingFields(well);

    return (
        <>
            <ActionLogCard
                wellId={wellId}
            />
            {missingFields && (
                <MissingDataCard />
            )}

            {(well.geolocation && well.mouzaGeolocation) && (
                <MapCard
                    regionTranslations={regionTranslations!}
                    geolocation={well.geolocation || well.mouzaGeolocation}
                    well={well}
                />
            )}


            <WellSummaryCard />

            {well.riskAssesment && (
                <RiskAssesmentCard
                    riskAssesment={well.riskAssesment}
                />
            )}

            <PhotoCard />
        </>
    );
}

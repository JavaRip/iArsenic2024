import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { DropdownDistrict, DropdownDivision, DropdownUnion, DropdownUpazila } from "../../types";
import EnglishRegionSelector from "./EnglishRegionSelector";
import BengaliRegionSelector from "./BengaliRegionSelector";
import { useRoute } from "wouter";
import PageCard from "../../components/PageCard";
import WellDataEntryLayout from "../../components/WellDataEntryLayout";
import TranslatableText from "../../components/TranslatableText";
import { useWells } from "../../hooks/useWells";
import { useDropdownData } from "../../hooks/useDropdownData";
import { useRegionTranslations } from "../../hooks/useRegionTranslations";

export type RegionErrors = {
    division: boolean;
    district: boolean;
    upazila: boolean;
    union: boolean;
    mouza: boolean;
};

export default function Region(): JSX.Element {
    const [, params] = useRoute('/well/:id/select-region');
    const wellId = params?.id;

    const { getWell, updateWell } = useWells();
    const { 
        data: well, 
        isLoading: isWellLoading,
        isError: isWellError,
    } = getWell(wellId);
    const updateWellMutation = updateWell();

    const {
        data: dropdownData, 
        isLoading: isDropdownLoading,
        isError: isDropdownError,
    } = useDropdownData();

    const {
        data: regionTranslations,
        isLoading: isTranslationsLoading,
        isError: isTranslationsError,
    } = useRegionTranslations();

    const [selectedDivision, setSelectedDivision] = useState<DropdownDivision | null>(
        null,
    );
    const [selectedDistrict, setSelectedDistrict] = useState<DropdownDistrict | null>(
        null,
    );
    const [selectedUpazila, setSelectedUpazila] = useState<DropdownUpazila | null>(
        null,
    );
    const [selectedUnion, setSelectedUnion] = useState<DropdownUnion | null>(
        null,
    );
    const [selectedMouza, setSelectedMouza] = useState<string | null>(
        null,
    );

    const [errors, setErrors] = useState<RegionErrors>({
        division: false,
        district: false,
        upazila: false,
        union: false,
        mouza: false,
    });

    function handleValidation() {
        const newErrors = {
            division: !selectedDivision,
            district: !selectedDistrict,
            upazila: !selectedUpazila,
            union: !selectedUnion,
            mouza: !selectedMouza,
        };
        setErrors(newErrors);

        return !Object.values(newErrors).some(value => value);
    }

    async function handleNext() {
        if (!wellId) return
        if (!handleValidation()) return;

        if (!selectedDivision?.division ||
            !selectedDistrict?.district ||
            !selectedUpazila?.upazila ||
            !selectedUnion?.union ||
            !selectedMouza
        ) return;

        const body: {
            division: string,
            district: string,
            upazila: string,
            union: string,
            mouza: string,
        } = {
            division: selectedDivision.division,
            district: selectedDistrict.district,
            upazila: selectedUpazila.upazila,
            union: selectedUnion.union,
            mouza: selectedMouza,
        };

        try {
            await updateWellMutation.mutateAsync({
                wellId,
                data: body,
            });
            navigate(`/well/${wellId}/staining`);
        } catch (err) {
            console.error('Failed to update well:', err);
        }
    }

    // set initial values if present on well data
    useEffect(() => {
        if (!well || !dropdownData) return;

        const division = dropdownData.find(d => d.division === well.division) || null;
        setSelectedDivision(division);

        const district = division?.districts?.find(d => d.district === well.district) || null;
        setSelectedDistrict(district);

        const upazila = district?.upazilas?.find(u => u.upazila === well.upazila) || null;
        setSelectedUpazila(upazila);

        const union = upazila?.unions?.find(u => u.union === well.union) || null;
        setSelectedUnion(union);

        setSelectedMouza(well.mouza || null);
    }, [well, dropdownData]);

    if (
        isWellLoading || 
        isDropdownLoading || 
        isTranslationsLoading
        // !selectedDivision
    ) {
        return (
            <Stack direction="column" alignContent="center" justifyContent="center">
                <CircularProgress />
            </Stack>
        );
    }

    if (
        isWellError || 
        isDropdownError || 
        isTranslationsError
    ) {
        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

    return (
        <WellDataEntryLayout
            title={
                <TranslatableText
                    variant="h4"
                    english="Region"
                    bengali="অঞ্চল"
                />
            }
            onNext={handleNext}
        >
            <PageCard>
                <TranslatableText 
                    mb='1rem'
                    textAlign='center'
                    variant='h5'
                    english='Enter Region Manually'
                    bengali="পুরণ করুন"
                />

                <EnglishRegionSelector
                    dropdownData={dropdownData!}
                    selectedDivision={selectedDivision}
                    setSelectedDivision={setSelectedDivision}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedUpazila={selectedUpazila}
                    setSelectedUpazila={setSelectedUpazila}
                    selectedUnion={selectedUnion}
                    setSelectedUnion={setSelectedUnion}
                    selectedMouza={selectedMouza}
                    setSelectedMouza={setSelectedMouza}
                    errors={errors}
                    setErrors={setErrors}
                />

                <BengaliRegionSelector
                    dropdownData={dropdownData!}
                    selectedDivision={selectedDivision}
                    setSelectedDivision={setSelectedDivision}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedUpazila={selectedUpazila}
                    setSelectedUpazila={setSelectedUpazila}
                    selectedUnion={selectedUnion}
                    setSelectedUnion={setSelectedUnion}
                    selectedMouza={selectedMouza}
                    setSelectedMouza={setSelectedMouza}
                    errors={errors}
                    setErrors={setErrors}
                    rt={regionTranslations!}
                />
            </PageCard>
        </WellDataEntryLayout>
    );
}

import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useRoute } from "wouter";
import { navigate } from "wouter/use-browser-location";
import WellDataEntryLayout from "../../components/WellDataEntryLayout";
import PageCard from "../../components/PageCard";
import TranslatableText from "../../components/TranslatableText";
import EnglishSpeedo from "../../components/Speedo/englishSpeedo";
import BengaliSpeedo from "../../components/Speedo/bengaliSpeedo";
import estimateTexts from "../../components/Speedo/estimateTexts";
import EmailIcon from '@mui/icons-material/Email';
import { useWells } from "../../hooks/useWells/useWells";
import { useEffect, useState } from "react";

type EstimateTexts = {
    english: { title: string; body: string };
    bengali: { title: string; body: string };
};

export default function Result(): JSX.Element {
    const [, params] = useRoute('/well/:id/result');
    const wellId = params?.id;

    const { getWell } = useWells();
    const { data: well, isLoading } = getWell(wellId);

    const [speedoValue, setSpeedoValue] = useState<number>();
    const [warningTexts, setWarningTexts] = useState<EstimateTexts>();

    useEffect(() => {
        if (!well?.riskAssesment) return;

        setSpeedoValue(well.riskAssesment);
        const textIndex = well.riskAssesment - 0.5 as 0 | 1 | 2 | 3 | 4;

        setWarningTexts({
            english: estimateTexts[textIndex].english,
            bengali: estimateTexts[textIndex].bengali,
        });
    }, [well]);

    if (isLoading) {
        return (
            <Stack direction="column" alignContent="center" justifyContent="center">
                <CircularProgress />
            </Stack>
        );
    }

    if (!well || speedoValue === undefined || !warningTexts) {
        return (
            <TranslatableText
                textAlign="center"
                variant="h6"
                english="Error loading data. Please refresh the page."
                bengali="ডেটা লোড করতে সমস্যা হয়েছে। পৃষ্ঠাটি রিফ্রেশ করুন।"
            />
        );
    }

    return (
        <WellDataEntryLayout
            title={<TranslatableText variant="h4" english="Results" bengali="ফলাফল" />}
            nextText={<TranslatableText english="Return to Start" bengali="আবার শুরু করুন" />}
            onNext={async () => navigate(`/`)}
        >
            <Stack sx={{ alignItems: 'center', height: '220px' }}>
                <Box className="english">
                    <EnglishSpeedo value={speedoValue} />
                </Box>
                <Box className="bengali">
                    <BengaliSpeedo value={speedoValue} />
                </Box>
            </Stack>

            <PageCard>
                <TranslatableText
                    variant="h6"
                    mb="1rem"
                    english={warningTexts.english.title}
                    bengali={warningTexts.bengali.title}
                />
                <TranslatableText
                    variant="body1"
                    mb="1rem"
                    english={warningTexts.english.body}
                    bengali={warningTexts.bengali.body}
                />

                <Button
                    sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                    variant="outlined"
                    onClick={() => navigate(`/understanding-risk`)}
                >
                    <TranslatableText
                        variant="body1"
                        english="What does this mean?"
                        bengali="ফলাফল বিশদ ব্যাখ্যা দেখতে চান?"
                    />
                </Button>

                <Button
                    sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                    variant="outlined"
                    onClick={() => navigate(`/map?highlight=${well.id}`)}
                >
                    <TranslatableText
                        variant="body1"
                        english="View on map"
                        bengali="মানচিত্রে দেখুন"
                    />
                </Button>
            </PageCard>

            <PageCard>
                <TranslatableText
                    variant="h6"
                    english="Need further information?"
                    bengali="আরও তথ্য দরকার?"
                />
                <Button
                    sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={() => {
                        window.location.href = `mailto:contact@iarsenic.com?subject=Well ID: ${wellId}`;
                    }}
                >
                    <TranslatableText
                        variant="body1"
                        english="Get in touch"
                        bengali="আমাদের ইমেইল করুন"
                    />
                </Button>
            </PageCard>
        </WellDataEntryLayout>
    );
}

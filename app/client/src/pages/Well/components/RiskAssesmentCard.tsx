import { Box, Button, Stack } from "@mui/material";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import EnglishSpeedo from "../../../components/Speedo/englishSpeedo";
import BengaliSpeedo from "../../../components/Speedo/bengaliSpeedo";
import { RiskAssesment } from "../../../models";
import { navigate } from "wouter/use-browser-location";
import estimateTexts from "../../../components/Speedo/estimateTexts";

export default function RiskAssesmentCard(
    { riskAssesment }: { riskAssesment: RiskAssesment }
): JSX.Element {
    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Risk Assesment"
                bengali="" // chatgpt generated
            />

            <Stack sx={{ alignItems: 'center', height: '220px', mt: '36px' }}>
                <Box className="english">
                    <EnglishSpeedo value={riskAssesment} />
                </Box>
                <Box className="bengali">
                    <BengaliSpeedo value={riskAssesment} />
                </Box>

            </Stack>

            <PageCard>
                <TranslatableText
                    variant="h5"
                    english={
                        estimateTexts[
                            (riskAssesment - 0.5) as 0 | 1 | 2 | 3 | 4
                        ].english.title
                    }
                    bengali={
                        estimateTexts[
                            (riskAssesment - 0.5) as 0 | 1 | 2 | 3 | 4
                        ].bengali.title
                    }
                />
                <TranslatableText
                    variant="body1"
                    mb="1rem"
                    english={
                        estimateTexts[
                            (riskAssesment - 0.5) as 0 | 1 | 2 | 3 | 4
                        ].english.body
                    }
                    bengali={
                        estimateTexts[
                            (riskAssesment - 0.5) as 0 | 1 | 2 | 3 | 4
                        ].bengali.body}
                />
            </PageCard>

            <Button
                sx={{ width: '90%', height: '4rem', mb: '1rem' }}
                variant="outlined"
                onClick={() => navigate(`/understanding-risk`)}
            >
                <TranslatableText
                    variant="body1"
                    english="What does this mean?"
                    bengali="ফলাফল বিশদ ব্যাখ্যা দেখতে চান?"
                />
            </Button>
        </PageCard>
    )
}

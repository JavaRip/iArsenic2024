import { Button, Typography } from "@mui/material";
import PageCard from "../../../components/PageCard";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TranslatableText from "../../../components/TranslatableText";
import { navigate } from "wouter/use-browser-location";

export default function ActionLogCard(
    { wellId }: { wellId: string }
): JSX.Element {
    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Action Log"
                bengali="কার্যক্রম লগ" // chatgpt generated
            />

            <TranslatableText
                variant="body1"
                english="See chronological changes to the well."
                bengali="কূপের ধারাবাহিক পরিবর্তনসমূহ দেখুন।" // chatgpt generated
            />

            <Button
                sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                variant="outlined"
                startIcon={<FormatListBulletedIcon />}
                onClick={async () => {
                    await navigate(`/well/${wellId}/action-log`)
                }}
            >
                <TranslatableText
                    variant="body1"
                    english="See Well Action Log"
                    bengali="কূপের কার্যক্রম লগ দেখুন" // chatgpt generated
                />
            </Button>
        </PageCard>
    )
}
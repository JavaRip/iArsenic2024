import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useRoute } from 'wouter';
import { useActionItems } from '../../hooks/useActionItems/useActionItems';
import TranslatableText from '../../components/TranslatableText';
import ActionLogItemCard from './ActionLogItemCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageCard from '../../components/PageCard';
import { navigate } from 'wouter/use-browser-location';

export default function WellActionLog() {
    const [, params] = useRoute('/well/:id/action-log');
    const wellId = params?.id;

    const { getResourceActionItems } = useActionItems();

    const {
        data,
        isLoading,
        error,
    } = getResourceActionItems(wellId as string);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    if (
        !wellId ||
        error
    ) {
        console.error('wellId: ')
        console.error(wellId)
        console.error(error)

        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

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
                    english='Return'
                    bengali='ফিরে যান'
                />
            </Button>

            <PageCard >
                <Button
                    sx={{ width: '90%', height: '4rem', my: '1rem' }}
                    variant="contained"
                    onClick={() => {
                        navigate(`/create-action-item/${wellId}`)
                    }}
                >
                    <TranslatableText
                        variant="body1"
                        english="Create action item"
                        bengali="অ্যাকশন আইটেম তৈরি করুন" // chatgpt generated
                    />
                </Button>
            </PageCard>

            {data!
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((d) => {
                    return (
                        <ActionLogItemCard
                            key={d.id}
                            actionItem={d}
                        />
                    )
                }
            )}
        </>
    );
}


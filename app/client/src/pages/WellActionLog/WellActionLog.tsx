import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useRoute } from 'wouter';
import { useActionItems } from '../../hooks/useActionItems/useActionItems';
import TranslatableText from '../../components/TranslatableText';
import ActionLogItemCard from './ActionLogItemCard';

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
                sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                variant="contained"
                onClick={() => {
                    console.log('create action item')
                }}
            >
                <TranslatableText
                    variant="body1"
                    english="Create action item"
                    bengali="অ্যাকশন আইটেম তৈরি করুন" // chatgpt generated
                />
            </Button>
            {data!.reverse().map((d) => {
                return (
                    <ActionLogItemCard
                        key={d.id}
                        actionItem={d}
                    />
                )
            })}
        </>
    );
}


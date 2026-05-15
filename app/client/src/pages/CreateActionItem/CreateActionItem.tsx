import { useState } from "react";
import { Button, TextField, Stack, CircularProgress } from "@mui/material";
import TranslatableText from "../../components/TranslatableText";
import PageCard from "../../components/PageCard";
import { useActionItems } from "../../hooks/useActionItems/useActionItems";
import { useRoute } from "wouter";
import { navigate } from "wouter/use-browser-location";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CreateActionItem(): JSX.Element {
    const [, params] = useRoute('/create-action-item/:id');
    const resourceId = params?.id;

    const { createActionItem } = useActionItems();
    const mutation = createActionItem();

    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!resourceId) return alert("No resourceId provided!");

        try {
            const createdItem = await mutation.mutateAsync({
                message,
                resourceId,
                type: "manual-entry",
            });

            navigate(`/well/${createdItem.resourceId}/action-log`);
        } catch (err) {
            console.error("Failed to create action item:", err);
        }
    };

    return (
        <>
            <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                sx={{ alignSelf: 'start' }}
                onClick={() => navigate(`/well/${resourceId}/action-log`)}
            >
                <TranslatableText
                    variant='body1'
                    english='Return'
                    bengali='ফিরে যান'
                />
            </Button>
            <PageCard>
                <Stack spacing={6} width='100%'>
                    <TranslatableText
                        variant="h4"
                        english='Manual Entry'
                        bengali='ম্যানুয়াল এন্ট্রি'
                        textAlign="center"
                    />
                    <TextField
                        label={
                            <TranslatableText
                                english='Message'
                                bengali='বার্তা'
                            />
                        }
                        multiline
                        minRows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                    />

                    <Button
                        sx={{ height: "4rem" }}
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={mutation.isPending || !message.trim()}
                    >
                        {mutation.isPending ? (
                            <CircularProgress />
                        ) : (
                            <TranslatableText
                                variant="body1"
                                english="Add log entry"
                                bengali="লগ এন্ট্রি যোগ করুন"
                            />
                        )}
                    </Button>

                    {mutation.isError && <p>Error creating action item</p>}
                </Stack>
            </PageCard>
        </>
    );
}
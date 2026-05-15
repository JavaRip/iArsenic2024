import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import PageCard from "../../components/PageCard";
import { ActionItem } from "../../models";
import TranslatableText from "../../components/TranslatableText";
import { useUsers } from '../../hooks/useUsers/useUsers';

export default function ActionLogItemCard({
    actionItem,
}: {
    actionItem: ActionItem,
}) {
    const { getUser } = useUsers()
    const {
        data,
        isLoading,
        error,
        isError,
    } = getUser(actionItem.userId)

    if (isLoading) {
        return <CircularProgress />
    }

    let userEmailOrGuest
    if (!isError) {
        userEmailOrGuest = data === 'guest' ? 'guest' : data!.email
    } else {
        userEmailOrGuest = '?'
    }

    let message
    try {
        message = JSON.stringify(
            JSON.parse(actionItem.message),
            null,
            2,
        )
    } catch (err) {
        message = actionItem.message
    }

    return (
        <PageCard>
            <Stack width='100%'>
                {(() => {
                    let english
                    let bengali

                    if (actionItem.type === 'data-event') {
                        english = 'Data Event'
                        bengali = 'ডেটা ইভেন্ট'
                    } else if (actionItem.type === 'manual-entry') {
                        english = 'Manual Entry'
                        bengali = 'ম্যানুয়াল এন্ট্রি'
                    } else {
                        english = actionItem.type
                        bengali = actionItem.type
                    }

                    return (
                        <TranslatableText
                            textAlign='center'
                            mb="1rem"
                            variant="h4"
                            english={english}
                            bengali={bengali}
                        />
                    )
                })()}

                <TranslatableText
                    variant="body1"
                    english={<>
                        <strong>Author</strong> {userEmailOrGuest}
                    </>}
                    bengali={<>
                        <strong>লেখক: </strong>{userEmailOrGuest}
                    </>}
                />

                <TranslatableText
                    variant="body1"
                    english={
                        <>
                            <strong>Event Time </strong>{
                            actionItem.createdAt.toLocaleString('en-GB', {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })}
                        </>
                    }
                    bengali={
                        <>
                            <strong>ইভেন্টের সময় </strong>{
                            actionItem.createdAt.toLocaleString('bn-BD', {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })}
                        </>
                    }
                />

                <TranslatableText
                    mb='1rem'
                    variant="body1"
                    english={<>
                        <strong>Message </strong>
                    </>}
                    bengali={<>
                        <strong>বার্তা </strong>
                    </>}
                />

                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1rem' }}>
                    {message}
                </pre>
            </Stack>
        </PageCard>
    )
}
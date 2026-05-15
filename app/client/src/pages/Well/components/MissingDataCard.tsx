import { navigate } from "wouter/use-browser-location";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import { Button, List, ListItem, Stack } from "@mui/material";

export default function MissingDataCard(
    {
        missingFields,
        wellId,
    }: {
        missingFields: string[],
        wellId: string,
    }
): JSX.Element {
    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Data Entry Incomplete"
                bengali="তথ্য প্রদান অসম্পূর্ণ" // chatgpt generated
            />

            <TranslatableText
                variant="body1"
                english={`
                    This well has missing data. As a result, some information
                    may not be available. If you are able to provide
                    the missing data, click below.
                `}
                bengali={`
                    এই নলকূপের কিছু তথ্য অনুপস্থিত। এর ফলে কিছু তথ্য
                    প্রদর্শিত নাও হতে পারে। যদি আপনি অনুপস্থিত
                    তথ্য প্রদান করতে পারেন, তাহলে নিচে ক্লিক করুন।
                `}
            />

            <Stack width='100%' m='16px'>
                <TranslatableText
                    variant="body1"
                    fontWeight='bold'
                    english='Missing Data'
                    bengali="" // chatgpt generated
                />

                <List sx={{ listStyleType: 'disc' }}>
                    {missingFields.map(item => (
                        <ListItem sx={{ display: 'list-item', ml: '32px' }}>
                            {(() => {
                                if (item === 'division') return (
                                    <TranslatableText
                                        variant='body1'
                                        english='Region'
                                        bengali='অঞ্চল'
                                    />
                                )
                                else if (item === 'staining') return (
                                    <TranslatableText
                                        variant='body1'
                                        english='Staining'
                                        bengali='পাকা মেঝের দাগের ধরন'
                                    />
                                )
                                else if (item === 'depth') return (
                                    <TranslatableText
                                        variant='body1'
                                        english='Depth'
                                        bengali='গভীরতা'
                                    />
                                )
                                else if (item === 'flooding') return (
                                    <TranslatableText
                                        variant='body1'
                                        english='Flooding'
                                        bengali='বন্যা'
                                    />
                                )
                                else if (item === 'wellInUse') return (
                                    <TranslatableText
                                        variant='body1'
                                        english='Well in Use'
                                        bengali='নলকূপ ব্যবহার'
                                    />
                                )
                            })()}
                        </ListItem>
                    ))}
                </List>
            </Stack>

            <Button
                sx={{ width: '90%', height: '4rem', my: '1rem' }}
                variant="contained"
                onClick={async () => {
                    if (missingFields.includes('division')) {
                        navigate(`/well/${wellId}/region`);
                    } else if (missingFields.includes('staining')) {
                        navigate(`/well/${wellId}/staining`);
                    } else if (missingFields.includes('depth')) {
                        await navigate(`/well/${wellId}/depth`)
                    } else if (missingFields.includes('flooding')) {
                        await navigate(`/well/${wellId}/flooding`)
                    } else if (missingFields.includes('wellInUse')) {
                        await navigate(`/well/${wellId}/well-in-use`)
                    }
                }}
            >
                <TranslatableText
                    variant="body1"
                    english="Complete Well Data"
                    bengali="নলকূপের তথ্য সম্পূর্ণ করুন" // chatgpt generated
                />
            </Button>
        </PageCard>
    )
}
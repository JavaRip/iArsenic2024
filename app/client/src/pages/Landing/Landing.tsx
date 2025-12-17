import { Button, CircularProgress, Link, List, ListItem } from "@mui/material";
import PageCard from "../../components/PageCard";
import TranslatableText from "../../components/TranslatableText";
import config from '../../config'
import { useWells } from "../../hooks/useWells";
import { navigate } from "wouter/use-browser-location";

export default function Landing(): JSX.Element {
    const { createWell } = useWells();
    const createWellMutation = createWell();

    async function startCreateWellFlow() {
        try {
            const newWell = await createWellMutation.mutateAsync(undefined);
            navigate(`/well/${newWell.id}/region`);
        } catch (err) {
            console.error('Failed to create well:', err);
        }
    }

    return (
        <>
            <TranslatableText
                mb='1rem'
                textAlign='center'
                variant='h4'
                english='Welcome to iArsenic'
                bengali='আইআর্সেনিকে আপনাকে স্বাগতম'
            />

            {config.env === 'staging' && (
                <PageCard sx={{ outline: '1px solid red' }}>
                    <TranslatableText
                        mb='1rem'
                        textAlign='center'
                        variant='h6'
                        english='WARNING'
                        bengali='⚠️ সতর্কবার্তা'
                    />

                    <TranslatableText
                        mb='1rem'
                        variant='body1'
                        english={
                            <>
                                This is a research release which is <b>not ready or approved
                                for use in the field.</b>
                            </>
                        }
                        bengali={`
                            এটি একটি গবেষণা পর্যায়ের ভার্সন, যা এখনো মাঠপর্যায়ে ব্যবহারের জন্য প্রস্তুত নয়।
                            অনুগ্রহ করে এটি শুধুমাত্র পরীক্ষা কিংবা অভিজ্ঞতা অর্জনের জন্য ব্যবহারের করুন।
                        `}
                    />
                </PageCard>
            )}

            <PageCard>
                <TranslatableText
                    bengali='দ্রুত মূল্যায়ন' // chatgpt generated
                    english='Express Assesment'
                    mb='1rem'
                    textAlign='center'
                    variant='h5'
                />

                <TranslatableText
                    variant='body1'
                    mb='1rem'
                    english={`
                        Protect your health with a few clicks.
                        iArsenic helps you assess the safety of your
                        drinking water by estimating arsenic levels
                        in tubewells across Bangladesh. Simply enter
                        a few details about your tubewell, and let
                        iArsenic do the rest.
                    `}
                    bengali={`
                        কয়েকটি ক্লিকের মাধ্যমে আপনার স্বাস্থ্যের সুরক্ষা করুন। আইআর্সেনিক
                        আপনাকে বাংলাদেশের টিউবওয়েলগুলির আর্সেনিক স্তরের মূল্যায়ন
                        করতে সাহায্য করে। আপনার টিউবওয়েল সম্পর্কে কিছু তথ্য প্রদান
                        করুন এবং বাকিটা আইআর্সেনিকের উপর ছেড়ে দিন।
                    `}
                />

                <List>
                    <ListItem>
                        <TranslatableText
                            variant='body1'
                            english={`
                                • Receive immediate arsenic risk assessments
                                based on tubewell information.
                            `}
                            bengali={`
                                • টিউবওয়েলের তথ্যের উপর ভিত্তি করে তাত্ক্ষণিক আর্সেনিক ঝুঁকি মূল্যায়ন।
                            `}
                        />
                    </ListItem>

                    <ListItem>
                        <TranslatableText
                            variant='body1'
                            english={`
                                • No technical expertise required —just provide
                                simple details about your tubewell.
                            `}
                            bengali={`
                                • কোনও প্রযুক্তিগত জ্ঞান প্রয়োজন নেই—শুধু আপনার টিউবওয়েল
                                সম্পর্কে  সহজ কিছু তথ্য সরবরাহ করুন।
                            `}
                        />
                    </ListItem>

                    <ListItem>
                        <TranslatableText
                            variant='body1'
                            english={`
                                • Your privacy is protected; all data is
                                anonymous and secure.
                            `}
                            bengali={`
                                • কোনও ব্যক্তিগত তথ্য সংগ্রহ করা হয় না - সমস্ত তথ্য
                                বেনামি এবং নিরাপদ।
                            `}
                        />
                    </ListItem>

                    <ListItem>
                        <TranslatableText
                            variant='body1'
                            english={<>
                                Using this app is entirely voluntary.&nbsp;
                                <Link
                                    onClick={() => navigate('/briefing')}  
                                    sx={{ cursor: 'pointer' }}
                                >
                                    Click here
                                </Link>
                                &nbsp;to learn what 
                                information you may need to provide if you choose to proceed
                            </>}
                            bengali={<>
                                এই অ্যাপটি ব্যবহার সম্পূর্ণ ইচ্ছানির্ভর।  আপনি এগিয়ে গেলে কী কী তথ্য দিতে হতে পারে, তা জানতে&nbsp;
                                <Link
                                    onClick={() => navigate('/briefing')}  
                                    sx={{ cursor: 'pointer' }}
                                >
                                    এখানে ক্লিক করুন।
                                </Link>
                            </>}
                        />
                    </ListItem>
                </List>
            </PageCard>

            {/* this could be a dedicated component that handles pending and error states */}
            <Button
                sx={{ 
                    width: '90%', 
                    height: '4rem',
                }}
                variant='contained'
                onClick={startCreateWellFlow}
                disabled={
                    createWellMutation.isPending ||
                    createWellMutation.isError
                }
            >
                {(() => {
                    if (createWellMutation.isPending) {
                        return <CircularProgress />
                    } else if (createWellMutation.isError) {
                        return (
                            <TranslatableText
                                variant='body1'
                                english='Something went wrong, please refresh'
                                bengali='Something went wrong, please refresh' // BENGALI PLACEHOLDER
                            />
                        )
                    } else {
                        return (
                            <TranslatableText
                                variant='body1'
                                english='Start Your Assesment'
                                bengali='আপনার মূল্যায়ন শুরু করুন'
                            />
                        )
                    }
                })()}
            </Button>
        </>
    );
}
import { CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import WellDataEntryLayout from "../../components/WellDataEntryLayout";
import { navigate } from "wouter/use-browser-location";
import PageCard from "../../components/PageCard";
import TranslatableText from "../../components/TranslatableText";
import { useWells } from "../../hooks/useWells";

export default function Flooding(): JSX.Element {
    const [, params] = useRoute('/well/:id/flooding');
    const wellId = params?.id;

    const { getWell, updateWell } = useWells();
    const { data: well, isLoading } = getWell(wellId);
    const updateWellMutation = updateWell()

    const [flooding, setFlooding] = useState<'yes' | 'no'>();
    const [error, setError] = useState<boolean>(false);

    function handleFloodingChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFlooding(event.target.value as 'yes' | 'no');
        setError(false);
    }

    useEffect(() => {
        if (flooding === undefined && well?.flooding !== undefined) {
            setFlooding(well.flooding ? 'yes' : 'no');
        }
    }, [well, flooding]);

    async function handleNext() {
        if (!flooding) {
            setError(true);
            return;
        }

        const floodingBool = flooding === 'yes';

        try {
            await updateWellMutation.mutateAsync({
            wellId: wellId!,
            data: { flooding: floodingBool },
            });

            navigate(`/well/${wellId}/well-in-use`);
        } catch (err) {
            console.error('Failed to update well', err);
        }
    }

    if (isLoading) {
        return (
            <Stack alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Stack>
        )
    }

    console.log(`rendering page with flooding: ${flooding}`)
    return (
        <WellDataEntryLayout
            title={
                <TranslatableText
                    variant="h4"
                    english="Flooding"
                    bengali="বন্যাপ্রবণতা"
                />
            }
            onNext={handleNext}
        >
            <PageCard>
                <TranslatableText
                    variant='h5'
                    mb='1rem'
                    textAlign="center"
                    english='Is the area prone to flooding?'
                    bengali='আপনার নলকূপ এলাকাটি কি বন্যাপ্রবণ অর্থাৎ বর্ষার সময়ে কলতলায় পানি আসে কি?'
                />

                <FormControl
                    error={error}
                    component="fieldset"
                    sx={{
                        width: 'max-content',
                        padding: '1rem',
                        borderRadius: '5px',
                        outline: error ? '1px solid red' : 'none',
                    }}
                >
                    <RadioGroup
                        key={flooding}
                        name="flooding-selector"
                        value={flooding}
                        onChange={handleFloodingChange}
                    >
                        <Stack direction='row' columnGap={3}>
                            <FormControlLabel 
                                value='yes' 
                                control={<Radio />} 
                                label={
                                    <TranslatableText
                                        variant="body1"
                                        english="Yes"
                                        bengali="হ্যাঁ"
                                    />
                                }
                            />
                            <FormControlLabel 
                                value='no' 
                                control={<Radio />} 
                                label={
                                    <TranslatableText
                                        variant="body1"
                                        english="No"
                                        bengali="না"
                                    />
                                }
                            />
                        </Stack>
                    </RadioGroup>
                </FormControl>

                {error && (
                    <TranslatableText
                        variant='body1'
                        error={true}
                        english='Please select an option'
                        bengali='একটি অপশন নির্বাচন করুন'
                    />
                )}
            </PageCard>
        </WellDataEntryLayout>
    );
}

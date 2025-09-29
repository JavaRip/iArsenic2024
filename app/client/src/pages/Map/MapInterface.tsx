import { Box, FormControlLabel, Checkbox, Avatar, Button, Stack, Slider } from "@mui/material";
import { useLanguage } from "../../utils/useLanguage";
import TranslatableText from "../../components/TranslatableText";

interface MapInterfaceProps {
    drinkingOnly: boolean,
    availableDates: string[],
    setDrinkingOnly: (value: boolean) => void;
    dateRange: { from: string, to: string } | undefined
    setDateRange: (dates: { from: string, to: string }) => void;
};

export default function MapInterface({ 
    drinkingOnly, 
    availableDates,
    setDrinkingOnly, 
    dateRange,
    setDateRange,
}: MapInterfaceProps) {
    const { setLanguage } = useLanguage();

    function handleDateFilterChange(_: Event, newValue: number | number[]) {
        if (!Array.isArray(newValue)) throw new Error('set dates value is not array')

        setDateRange({
            from: availableDates[newValue[0]],
            to: availableDates[newValue[1]],
        })
    }

    function getDateLabel(index: number): string {
        const d = availableDates[index];

        return new Date(d).toLocaleDateString(
            undefined, 
            { month: 'short', day: 'numeric', year: 'numeric' }
        );
    }

    return (
        <>
            <Stack 
                direction='row'
                sx={{
                    position: 'fixed',
                    zIndex: 1000,
                    left: 0,
                    top: 0,
                    ml: '48px',
                    mt: '8px',
                }}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    ml={2}
                    columnGap={3}
                >
                    <Button sx={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '4px',
                        border: '2px solid gray',
                        textTransform: 'none',
                        '&:hover': { background: 'white' }
                    }}>
                        <TranslatableText 
                            variant='body1' 
                            textAlign='center'
                            english='Return'
                            bengali='ফিরে যান'
                        />
                    </Button>
                </Stack>

                <Stack
                    direction='row'
                    alignItems='center'
                    ml={2}
                    columnGap={3}
                    onClick={() => setLanguage('english')}
                    sx={{ cursor: 'pointer' }}
                >
                    <Button
                        startIcon={
                            <Avatar
                                sx={{ height: '100%', width: '4rem', borderRadius: '8px' }}
                                src={`/british.png`}
                            />
                        }
                    />
                </Stack>

                <Stack
                    direction='row'
                    alignItems='center'
                    ml={2}
                    columnGap={3}
                    onClick={() => setLanguage('bengali')}
                    sx={{ cursor: 'pointer' }}
                >
                    <Button
                        startIcon={
                            <Avatar
                                sx={{ height: '100%', width: '4rem', borderRadius: '8px' }}
                                src={`/bangladesh.jpg`}
                            />
                        }
                    />
                </Stack>
            </Stack>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    zIndex: 1000,
                    p: 2,
                    m: 2,
                    backgroundColor: 'white',
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={drinkingOnly}
                            onChange={(e) => setDrinkingOnly(e.target.checked)}
                        />
                    }
                    label={
                        <TranslatableText
                            english="Well in use"
                            bengali="নলকূপ ব্যবহার"
                        />
                    }
                />
                <Box
                    sx={{
                        width: '320px',
                    }} 
                >
                    <Slider
                        onChange={handleDateFilterChange}
                        value={
                            dateRange == null ?
                                [0, Object.keys(availableDates).map(d => Number(d)).length - 1] :
                                [
                                    availableDates.indexOf(dateRange.from), 
                                    availableDates.indexOf(dateRange.to), 
                                ]
                        }
                        valueLabelDisplay="auto"
                        min={0}
                        max={availableDates.length}
                        valueLabelFormat={(v) => getDateLabel(v)}
                        getAriaValueText={(v) => getDateLabel(v)}
                    />
                </Box>
            </Box>
        </>
    );
}

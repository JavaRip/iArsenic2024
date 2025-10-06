import { Slider, Box } from "@mui/material";
import TranslatableText from "../../../../../components/TranslatableText";

interface props {
    availableDates: string[]
    dateRange: { from: string, to: string } | undefined
    setDateRange: (dateRange: { from: string, to: string }) => void
}

export default function DateSlider({
    availableDates,
    dateRange,
    setDateRange,
}: props) {
    function handleDateFilterChange(
        _: Event,
        newValue: number | number[],
    ) {
        if (!Array.isArray(newValue)) {
            throw new Error('set dates value is not array')
        }

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
        <Box
            mt='16px'
            sx={{
                width: '320px',
            }} 
        >
            <TranslatableText
                mb='8px'
                fontWeight='bold'
                english='Date Range Filter'
                bengali='তারিখ পরিসর ফিল্টার' // chatgpt generated
            />
            <Slider
                sx={{ 
                    mx: '36px',
                    width: '240px',
                }}
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
                max={availableDates.length - 1}
                valueLabelFormat={(v) => getDateLabel(v)}
                getAriaValueText={(v) => getDateLabel(v)}
                step={1}
                marks={[ 
                    { 
                        value: 0, label: getDateLabel(0),
                    },
                    { 
                        value: availableDates.length - 1, 
                        label: getDateLabel(availableDates.length - 1),
                    }
                ]}
            />
        </Box>
    )
}
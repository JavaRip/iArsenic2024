import { Slider, Box } from "@mui/material";
import TranslatableText from "../../../components/TranslatableText";

interface Props {
    earliestAvailableDate: string
    latestAvailableDate: string
    dateRange: { from: string, to: string } | undefined
    setDateRange: (dateRange: { from: string, to: string }) => void
}

export default function DateSlider({
    earliestAvailableDate,
    latestAvailableDate,
    dateRange,
    setDateRange,
}: Props) {
    const dailyDates = generateDailyRange(earliestAvailableDate, latestAvailableDate)

    function handleDateFilterChange(
        _: Event,
        newValue: number | number[],
    ) {
        if (!Array.isArray(newValue)) throw new Error('Slider value must be an array')

        setDateRange({
            from: dailyDates[newValue[0]],
            to: dailyDates[newValue[1]],
        })
    }

    function getDateLabel(index: number): string {
        const d = dailyDates[index];

        return new Date(d).toLocaleDateString(
            undefined, 
            { month: 'short', day: 'numeric', year: 'numeric' }
        );
    }

    function generateDailyRange(start: string, end: string): string[] {
        const startDate = new Date(start)
        const endDate = new Date(end)

        // Add one extra day to include the latest day
        endDate.setDate(endDate.getDate() + 1)

        const dates: string[] = []

        for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
            dates.push(d.toISOString().split('T')[0]) // YYYY-MM-DD format
        }

        return dates
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
                sx={{ mx: '36px', width: '240px' }}
                onChange={handleDateFilterChange}
                value={
                    dateRange == null
                        ? [0, dailyDates.length - 1]
                        : [
                            Math.max(0, dailyDates.indexOf(dateRange.from)),
                            Math.max(0, dailyDates.indexOf(dateRange.to))
                        ]
                }
                valueLabelDisplay="auto"
                min={0}
                max={dailyDates.length - 1}
                step={1}
                valueLabelFormat={getDateLabel}
                getAriaValueText={getDateLabel}
                marks={[
                    { value: 0, label: getDateLabel(0) },
                    { value: dailyDates.length - 1, label: getDateLabel(dailyDates.length - 1) }
                ]}
            />
        </Box>
    )
}
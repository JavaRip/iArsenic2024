import { Slider, Box } from "@mui/material";
import TranslatableText from "../../../components/TranslatableText";

interface props {
    depthRange: { from: number, to: number }
    setDepthRange: (depthRange: { from: number, to: number }) => void
}

export default function DateSlider({
    depthRange,
    setDepthRange,
}: props) {
    function handleDateFilterChange(
        _: Event,
        newValue: number | number[],
    ) {
        if (!Array.isArray(newValue)) {
            throw new Error('set dates value is not array')
        }

        setDepthRange({
            from: newValue[0],
            to: newValue[1],
        })
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
                english='Depth Range Filter (meters)'
                bengali='BENGALI PLACEHOLDER'
            />
            <Slider
                sx={{ 
                    mx: '36px',
                    width: '240px',
                }}
                onChange={handleDateFilterChange}
                value={[depthRange.from, depthRange.to]}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                // valueLabelFormat={(v) => getDateLabel(v)}
                // getAriaValueText={(v) => getDateLabel(v)}
                step={1}
                marks={[ 
                    { 
                        value: 0,
                        label: 0,
                    },
                    { 
                        value: 500,
                        label: 500,
                    }
                ]}
            />
        </Box>
    )
}
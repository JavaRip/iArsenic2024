import { Box } from "@mui/material";
import TranslatableText from "../../../../../components/TranslatableText";
import { RiskFilter } from "../../../Map";
import DateSlider from "./DateSlider";
import RiskLevelFilter from "./RiskLevelFilter";
import AttributeFilter from "../AttributeFilter/AttributeFilter";

interface props {
    availableDates: string[]
    dateRange: { from: string, to: string } | undefined
    drinkingOnly: boolean
    geolocatedOnly: boolean
    riskFilter: RiskFilter
    setDateRange: (dateRange: { from: string, to: string }) => void
    setDrinkingOnly: (drinkingOnly: boolean) => void
    setGeolocatedOnly: (geolocatedOnly: boolean) => void
    setRiskFilter: React.Dispatch<React.SetStateAction<RiskFilter>>;
}

export default function DataFilter({
    availableDates,
    dateRange,
    drinkingOnly,
    geolocatedOnly,
    riskFilter,
    setDateRange,
    setDrinkingOnly,
    setGeolocatedOnly,
    setRiskFilter,
}: props) {
    return (
        <Box
            sx={{
                bottom: 0,
                right: 0,
                zIndex: 1000,
                p: 2,
                ml: 2,
                mr: 2,
                backgroundColor: 'white',
            }}
        >
            <TranslatableText
                fontWeight='bold'
                variant='h5'
                english='Data Filter' 
                bengali='তথ্য ফিল্টার' // chatgpt generated
            />

            <AttributeFilter 
                drinkingOnly={drinkingOnly}
                geolocatedOnly={geolocatedOnly}
                setDrinkingOnly={setDrinkingOnly}
                setGeolocatedOnly={setGeolocatedOnly}
            />

            <RiskLevelFilter 
                riskFilter={riskFilter} 
                setRiskFilter={setRiskFilter}
            />

            <DateSlider
                availableDates={availableDates}            
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
        </Box>
    )
}
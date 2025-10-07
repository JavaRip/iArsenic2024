import { useState } from "react";
import { RiskFilter } from "../../Map";
import Fabs from "./Fabs";
import FilterDrawer from "../FilterDrawer/FilterDrawer";

interface MapInterfaceProps {
    drinkingOnly: boolean,
    availableDates: string[],
    setDrinkingOnly: (value: boolean) => void;
    dateRange: { from: string, to: string } | undefined
    setDateRange: (dates: { from: string, to: string }) => void
    riskFilter: RiskFilter
    setRiskFilter: React.Dispatch<React.SetStateAction<RiskFilter>>;
    geolocatedOnly: boolean
    setGeolocatedOnly: (value: boolean) => void
    numWells: number
    totalWells: number
}

export default function MapInterface({ 
    availableDates,
    dateRange,
    drinkingOnly, 
    geolocatedOnly,
    numWells,
    riskFilter,
    setDateRange,
    setDrinkingOnly, 
    setGeolocatedOnly,
    setRiskFilter,
    totalWells,
}: MapInterfaceProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Fabs 
                open={open}
                setOpen={setOpen} 
            />
            <FilterDrawer
                availableDates={availableDates}
                dateRange={dateRange}
                drinkingOnly={drinkingOnly}
                geolocatedOnly={geolocatedOnly}
                numWells={numWells}
                open={open}
                riskFilter={riskFilter}
                setDateRange={setDateRange}
                setDrinkingOnly={setDrinkingOnly}
                setGeolocatedOnly={setGeolocatedOnly}
                setOpen={setOpen} 
                setRiskFilter={setRiskFilter}
                totalWells={totalWells}
            />
        </>
    );   
}

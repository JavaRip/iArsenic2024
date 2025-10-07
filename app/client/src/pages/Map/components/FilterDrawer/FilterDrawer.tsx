import { Drawer, Stack, Typography, Button, Divider, Avatar } from "@mui/material";
import TranslatableText from "../../../../components/TranslatableText";
import { RiskFilter } from "../../Map";
import { useLanguage } from "../../../../utils/useLanguage";
import Banner from "./Banner";
import DataFilter from "./DataFilter/DataFilter";

interface props {
    availableDates: string[]
    dateRange: { from: string, to: string } | undefined
    drinkingOnly: boolean
    geolocatedOnly: boolean
    numWells: number
    open: boolean
    riskFilter: RiskFilter
    setDateRange: (dateRange: { from: string, to: string }) => void
    setDrinkingOnly: (drinkingOnly: boolean) => void
    setGeolocatedOnly: (geolocatedOnly: boolean) => void
    setOpen: (open: boolean) => void
    setRiskFilter: React.Dispatch<React.SetStateAction<RiskFilter>>;
    totalWells: number
}

export default function FilterDrawer({
    availableDates,
    dateRange,
    drinkingOnly,
    geolocatedOnly,
    numWells,
    open,
    riskFilter,
    setDateRange,
    setDrinkingOnly,
    setGeolocatedOnly,
    setOpen,
    setRiskFilter,
    totalWells,
}: props) {
    const { setLanguage } = useLanguage();

    return (
        <Drawer
            open={open}
            variant='persistent'
        >
            <Banner 
                setOpen={setOpen} 
            />
            
            <DataFilter 
                availableDates={availableDates}
                dateRange={dateRange}
                drinkingOnly={drinkingOnly}
                geolocatedOnly={geolocatedOnly}
                riskFilter={riskFilter}
                setDateRange={setDateRange}
                setDrinkingOnly={setDrinkingOnly}
                setGeolocatedOnly={setGeolocatedOnly}
                setRiskFilter={setRiskFilter}
            />

            <Stack justifyItems='center'>
                <TranslatableText
                    ml={2}
                    my={2}
                    mt={0}
                    english={`Showing ${numWells} / ${totalWells} Wells`}
                    bengali={`${numWells} / ${totalWells} নলকূপ প্রদর্শিত হচ্ছে`} // chatgpt generated
                    variant='h6'
                />
            </Stack>

            <Divider/>

            <TranslatableText
                ml={2}
                my={2}
                mt={2}
                english='Select Language' 
                bengali='ভাষা নির্বাচন করুন'
                variant='h6'
                fontWeight='bold'
            />

            <Stack>
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
                    <Typography>English</Typography>
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
                    <Typography>বাংলা</Typography>
                </Stack>
            </Stack>
        </Drawer>
    )
}
import { Box, FormControlLabel, Checkbox, Avatar, Button, Stack, Slider, Drawer, Fab, Typography, Popover, Divider } from "@mui/material";
import { useLanguage } from "../../utils/useLanguage";
import TranslatableText from "../../components/TranslatableText";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { predictionToRiskFactor } from "./utils/predictionToRiskFactor";
import { RiskFilter } from "./Map";
import CloseIcon from '@mui/icons-material/Close';
import { navigate } from "wouter/use-browser-location";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
    drinkingOnly, 
    availableDates,
    setDrinkingOnly, 
    dateRange,
    setDateRange,
    riskFilter,
    setRiskFilter,
    geolocatedOnly,
    setGeolocatedOnly,
    numWells,
    totalWells,
}: MapInterfaceProps) {
    const { setLanguage } = useLanguage();
    const [open, setOpen] = useState(false)

    const [geoAnchorEl, setGeoAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [drinkAnchorEl, setDrinkAnchorEl] = useState<HTMLButtonElement | null>(null);

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
                sx={{
                    position: 'fixed',
                    right: '48px',
                    bottom: '48px',
                    width: '48px',
                    zIndex: 1000,
                    cursor: 'pointer',
                    gap: '16px',
                }}
            >
                <Fab 
                    size='medium'
                    color='primary'
                    onClick={() => window.history.back()}
                >
                    <KeyboardReturnIcon/>
                </Fab>
                <Fab
                    size='medium'
                    color='primary'
                    onClick={() => setOpen(!open)}
                >
                    <SettingsIcon/>
                </Fab>
            </Stack>

            <Drawer
                open={open}
                variant='persistent'
            >
                <Stack
                    height='48px'
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'secondary.main',
                    }}
                >
                    <Typography 
                        onClick={() => navigate(`/`)}
                        ml='16px' 
                        variant='h6'
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        iArsenic
                    </Typography>
                    <Button 
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon sx={{ color: 'secondary.main' }} />
                    </Button>
                </Stack>

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
                        bengali='BENGALI PLACEHOLDEr'
                    />
                    <Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            color: 'primary.main'
                                        }}
                                        checked={drinkingOnly}
                                        onChange={(e) => setDrinkingOnly(e.target.checked)}
                                    />
                                }
                                label={
                                    <TranslatableText
                                        english="Well In Use Only"
                                        bengali="নলকূপ ব্যবহার"
                                    />
                                }
                            />
                            <Button onClick={(e) => setDrinkAnchorEl(e.currentTarget)}>
                                <HelpOutlineIcon/>
                            </Button>
                            <Popover 
                                id='drinking-popover'
                                open={Boolean(drinkAnchorEl)}
                                onClose={() => setDrinkAnchorEl(null)}
                                anchorEl={drinkAnchorEl}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Box p={2} maxWidth='360px'>
                                    <TranslatableText
                                        english="This filter hides pins, where the user reported that the well is not in active use as a drinking water source."
                                        bengali="BENGALI PLACEHOLDER"
                                    />
                                </Box>
                            </Popover>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            color: 'primary.main'
                                        }}
                                        checked={geolocatedOnly}
                                        onChange={(e) => setGeolocatedOnly(e.target.checked)}
                                    />
                                }
                                label={
                                    <TranslatableText
                                        english="Geolocated Only"
                                        bengali="BENGALI PLACEHOLDER"
                                    />
                                }
                            />
                            <Button onClick={(e) => setGeoAnchorEl(e.currentTarget)}>
                                <HelpOutlineIcon/>
                            </Button>
                            <Popover 
                                id='geolocation-popover'
                                open={Boolean(geoAnchorEl)}
                                onClose={() => setGeoAnchorEl(null)}
                                anchorEl={geoAnchorEl}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Box p={2} maxWidth='360px'>
                                    <TranslatableText
                                        english="The pins get their geolocation from two possible sources. Either the centroid of the region entered by the user when generating the prediction, or the geolocation of the device. The geolocation of the device requires the user to be with the well when generating the prediction so if more likely to represent a real well user looking for a risk assesment of their well. This filter removes pins where the geolocation was not reported by the device."
                                        bengali="BENGALI PLACEHOLDER"
                                    />
                                </Box>
                            </Popover>
                        </Stack>
                    </Stack>
                    <Stack mt='16px'>
                        <TranslatableText
                            fontWeight='bold'
                            english="Risk Level"
                            bengali="BENGALI PLACEHOLDER"
                        />
                        {[0.5, 1.5, 2.5, 3.5, 4.5].map((val) => {
                            const label = predictionToRiskFactor(val);
                            const key = label.english.toLowerCase() as keyof RiskFilter;

                            return (
                                <FormControlLabel
                                    key={val}
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: 'primary.main'
                                            }}
                                            checked={riskFilter[key]}
                                            onChange={(e) => (
                                                setRiskFilter(prev => ({
                                                    ...prev,
                                                    [key]: e.target.checked,
                                                }))
                                            )}
                                        />
                                    }
                                    label={
                                        <TranslatableText
                                            english={label.english}
                                            bengali={label.bengali}
                                        />
                                    }
                                />
                            );
                        })}
                    </Stack>
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
                            bengali='BENGALI PLACEHOLDER'
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
                </Box>

                <Stack justifyItems='center'>
                    <TranslatableText
                        ml={2}
                        my={2}
                        mt={0}
                        english={`Showing ${numWells} / ${totalWells} Wells`}
                        bengali={`${numWells} / ${totalWells}`}
                        variant='h6'
                    />
                </Stack>

                <Divider/>

                <TranslatableText
                    ml={2}
                    my={2}
                    mt={0}
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
        </>
    );
}

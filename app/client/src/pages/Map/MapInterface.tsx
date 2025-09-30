import { Box, FormControlLabel, Checkbox, Avatar, Button, Stack, Slider, Drawer, Fab } from "@mui/material";
import { useLanguage } from "../../utils/useLanguage";
import TranslatableText from "../../components/TranslatableText";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { predictionToRiskFactor } from "./utils/predictionToRiskFactor";
import { RiskFilter } from "./Map";

interface MapInterfaceProps {
    drinkingOnly: boolean,
    availableDates: string[],
    setDrinkingOnly: (value: boolean) => void;
    dateRange: { from: string, to: string } | undefined
    setDateRange: (dates: { from: string, to: string }) => void
    riskFilter: RiskFilter
    setRiskFilter: React.Dispatch<React.SetStateAction<RiskFilter>>;
}

export default function MapInterface({ 
    drinkingOnly, 
    availableDates,
    setDrinkingOnly, 
    dateRange,
    setDateRange,
    riskFilter,
    setRiskFilter,
}: MapInterfaceProps) {
    const { setLanguage } = useLanguage();
    const [open, setOpen] = useState(false)

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
                    direction='row'
                >
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
                        bottom: 0,
                        right: 0,
                        zIndex: 1000,
                        p: 2,
                        m: 2,
                        backgroundColor: 'white',
                    }}
                >
                    <TranslatableText
                        variant='h5'
                        english='Data Filter' 
                        bengali='BENGALI PLACEHOLDEr'
                    />
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
                    <Stack>
                        <TranslatableText
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
                        sx={{
                            width: '320px',
                        }} 
                    >
                        <TranslatableText
                            english='Date Range Filter'
                            bengali='BENGALI PLACEHOLDER'
                        />
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
                            max={availableDates.length - 1}
                            valueLabelFormat={(v) => getDateLabel(v)}
                            getAriaValueText={(v) => getDateLabel(v)}
                        />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

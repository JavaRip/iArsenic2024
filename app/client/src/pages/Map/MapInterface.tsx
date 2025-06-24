import { Box, FormControlLabel, Checkbox, Avatar, Button, Stack } from "@mui/material";
import { useLanguage } from "../../utils/useLanguage";
import TranslatableText from "../../components/TranslatableText";

type MapInterfaceProps = {
    drinkingOnly: boolean;
    setDrinkingOnly: (value: boolean) => void;
};

export default function MapInterface({ drinkingOnly, setDrinkingOnly }: MapInterfaceProps) {
    const { setLanguage } = useLanguage();

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
            </Box>
        </>
    );
}

import { Stack, FormControlLabel, Checkbox, Box } from "@mui/material";
import TranslatableText from "../../../../../components/TranslatableText";
import GenericPopover from "../../../../../components/GenericPopover/GenericPopover";

interface props {
    drinkingOnly: boolean;
    geolocatedOnly: boolean;
    setDrinkingOnly: (drinkingOnly: boolean) => void;
    setGeolocatedOnly: (geolocatedOnly: boolean) => void;
}

export default function AttributeFilter({
    drinkingOnly,
    geolocatedOnly,
    setDrinkingOnly,
    setGeolocatedOnly,
}: props) {
    return (
        <Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{ color: "primary.main" }}
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

                <GenericPopover id="drinking-popover">
                    <Box p={2} maxWidth="360px">
                        <TranslatableText
                            english="This filter hides pins, where the user reported that the well is not in active use as a drinking water source."
                            bengali="এই ফিল্টারটি সেই নলকূপগুলোর চিহ্ন লুকিয়ে রাখে, যেখানে ব্যবহারকারী জানিয়েছেন যে নলকূপটি বর্তমানে পানীয় জলের উৎস হিসেবে ব্যবহৃত হচ্ছে না।"
                        />
                    </Box>
                </GenericPopover>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{ color: "primary.main" }}
                            checked={geolocatedOnly}
                            onChange={(e) => setGeolocatedOnly(e.target.checked)}
                        />
                    }
                    label={
                        <TranslatableText
                            english="Geolocated Only"
                            bengali="শুধুমাত্র অবস্থান নির্ধারিত"
                        />
                    }
                />

                <GenericPopover id="geolocation-popover">
                    <Box p={2} maxWidth="360px">
                        <TranslatableText
                            english="Show wells with device reported geolocation only"
                            bengali="শুধুমাত্র যেসব নলকূপের যন্ত্র দ্বারা নির্ধারিত অবস্থান আছে সেগুলো দেখাও"
                        />
                    </Box>
                </GenericPopover>
            </Stack>
        </Stack>
    );
}

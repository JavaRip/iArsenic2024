import { Stack, FormControlLabel, Checkbox } from "@mui/material";
import TranslatableText from "../../../../../components/TranslatableText";
import { RiskFilter } from "../../../Map";
import { predictionToRiskFactor } from "../../../../../utils/predictionToRiskFactor";

interface props {
    riskFilter: RiskFilter
    setRiskFilter: React.Dispatch<React.SetStateAction<RiskFilter>>;
}

export default function RiskLevelFilter({
    riskFilter,
    setRiskFilter,
}: props) {
    return (
        <Stack mt='16px'>
            <TranslatableText
                fontWeight='bold'
                english="Risk Level"
                bengali="ঝুঁকির স্তর"
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
    )
}
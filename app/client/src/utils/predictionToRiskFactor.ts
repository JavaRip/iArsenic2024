import { RiskFilter } from "../pages/Map/Map";

export function predictionToRiskFactor(
    prediction: number | undefined
): { english: string, bengali: string } {
    switch (prediction) {
        case 0.5:
            return { english: 'Rare', bengali: 'বিরল' };
        case 1.5:
            return { english: 'Low', bengali: 'কম' };
        case 2.5:
            return { english: 'Medium', bengali: 'মাঝারি' };
        case 3.5:
            return { english: 'High', bengali: 'উচ্চ' };
        case 4.5:
            return { english: 'Severe', bengali: 'গুরুতর' };
        default:
            return { english: 'Unknown', bengali: 'N/A' };
    }
}

export function predictionToRiskKey(prediction: number | undefined): keyof RiskFilter {
    switch (prediction) {
        case 0.5: return "rare";
        case 1.5: return "low";
        case 2.5: return "medium";
        case 3.5: return "high";
        case 4.5: return "severe";
        default:  return "unknown";
    }
}
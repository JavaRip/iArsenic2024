import { LineChart } from "@mui/x-charts";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import getLineChartData from "../utils/getLineChartData";
import { Well } from "../../../models";

interface props {
    wells: Well[]
}

export default function LineChartComponent({ wells }: props) {
    const {
        labels: lineLabels,
        allWellsCumulative,
        geolocatedWellsCumulative,
        predictedWellsCumulative,
        geolocatedPredictedWellsCumulative,
    } = getLineChartData(wells)

    return (
        <PageCard expandable="1280px">
            <TranslatableText 
                english='All Time Cumulative Data'
                bengali="সর্বমোট সম্মিলিত তথ্য"
                mb='1rem'
                textAlign="center"
                variant='h5' 
            />
                <LineChart
                className="english"
                xAxis={[{ data: lineLabels, scaleType: "point" }]}
                series={[
                    { label: "All wells", data: allWellsCumulative },
                    { label: "Predicted", data: predictedWellsCumulative },
                    { label: "Geolocated", data: geolocatedWellsCumulative },
                    { label: "Geolocated & Predicted", data: geolocatedPredictedWellsCumulative },
                ]}
                height={360}
                margin={{ left: 48, right: 16, top: 16, bottom: 96 }}
                slotProps={{
                    legend: {
                        position: { vertical: "bottom", horizontal: "middle" },
                        direction: "row",
                    },
                }}
            />
            <LineChart
                className="bengali"
                xAxis={[{ data: lineLabels, scaleType: "point" }]}
                series={[
                    { label: "সব নলকূপ", data: allWellsCumulative },
                    { label: "পূর্বাভাসকৃত নলকূপ", data: predictedWellsCumulative },
                    { label: "অবস্থানসহ নলকূপ", data: geolocatedWellsCumulative },
                    { label: "অবস্থান ও পূর্বাভাস সহ নলকূপ", data: geolocatedPredictedWellsCumulative },
                ]}
                height={360}
                margin={{ left: 48, right: 16, top: 16, bottom: 96 }}
                slotProps={{
                    legend: {
                        position: { vertical: "bottom", horizontal: "middle" },
                        direction: "row",
                    },
                }}
            />
        </PageCard>
    )
}
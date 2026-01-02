import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import { Well } from "../../../models";
import getBarChartData from "../utils/getBarChartData";
import { BarChart } from "@mui/x-charts";

interface props {
    wells: Well[]
}

export default function BarChartComponent({ wells }: props) {
    const { 
        labels,
        allWellsBar,
        geolocatedBar,
        geolocatedPredictedBar,
        predictedBar,
    } = getBarChartData(wells)

    return (
        <PageCard expandable="1280px">
            <TranslatableText 
                english='Usage per day - past 14 days'
                bengali="দৈনিক ব্যবহার - গত ১৪ দিন"
                mb='1rem'
                textAlign="center"
                variant='h5' 
            />
            <BarChart
                className='english'
                xAxis={[{ data: labels, scaleType: "band" }]}
                series={[
                    { 
                        label: "All wells", 
                        data: allWellsBar,
                    }, { 
                        label: "Predicted", 
                        data: predictedBar,
                    }, { 
                        label: "Geolocated", 
                        data: geolocatedBar,
                    }, {
                        label: "Geolocated & Predicted", 
                        data: geolocatedPredictedBar,
                    }
                ]}
                height={360}
                margin={{ left: 48, right: 16, top: 16, bottom: 96 }}
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        direction: 'row',
                    }
                }}
            />
            <BarChart
                className='bengali'
                xAxis={[{ data: labels, scaleType: "band" }]}
                series={[
                    { 
                        label: "সব নলকূপ", 
                        data: allWellsBar,
                    }, { 
                        label: "পূর্বাভাসকৃত নলকূপ", 
                        data: predictedBar,
                    }, { 
                        label: "অবস্থানসহ নলকূপ", 
                        data: geolocatedBar,
                    }, {
                        label: "অবস্থান ও পূর্বাভাস সহ নলকূপ", 
                        data: geolocatedPredictedBar,
                    },
                ]}
                height={360}
                margin={{ left: 48, right: 16, top: 16, bottom: 96 }}
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        direction: 'row',
                    }
                }}
            />
        </PageCard>
    )
}
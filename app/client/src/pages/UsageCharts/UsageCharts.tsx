import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useWells } from "../../utils/useWells";
import TranslatableText from "../../components/TranslatableText";
import PageCard from "../../components/PageCard";
import { Well } from "iarsenic-types";
import { LineChart } from "@mui/x-charts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function getBarChartData(wells: Well[]) {
    const labels = []
    const allWellsBar = []
    const geolocatedBar = []
    const predictedBar = []

    const today = new Date()

    for (let i = 13; i >= 0; i -= 1) {
        const xAxisDay = new Date(today)
        xAxisDay.setDate(xAxisDay.getDate() - i)

        const year = xAxisDay.getFullYear()
        const month = (() => {
            const month = xAxisDay.getMonth() + 1
            if (month < 10) return '0' + month
            return month
        })()
        const day = xAxisDay.getDate()
        labels.push(`${year}-${month}-${day}`)

        const wellsOnDay = wells.filter(w => { 
            const wellCreatedAt = new Date(w.createdAt)
            return wellCreatedAt.toDateString() === xAxisDay.toDateString()
        })

        const geolocatedWellsOnDay = wellsOnDay.filter(w => (
            w.geolocation != null
        ))

        const predictedWellsOnDay = wellsOnDay.filter(w => (
            w.modelOutput != null && 
            w.geolocation != null
        ))

        allWellsBar.push(wellsOnDay.length)
        geolocatedBar.push(geolocatedWellsOnDay.length)
        predictedBar.push(predictedWellsOnDay.length)
    }

    return {
        labels,
        allWellsBar,
        geolocatedBar,
        predictedBar,
    }
}

function getLineChartData(wells: Well[]) {
    const labels = []
    const allWellsCumulative = []
    const geolocatedWellsCumulative = []
    const predictedWellsCumulative = []

    const today = new Date()

    const wellsByDate = wells.sort((a, b) => (
        Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
    ))

    const xAxisPoints = (() => {
        const start = new Date(wellsByDate[0].createdAt)
        const end = today
        const timeDifference = Number(end) - Number(start)
        return timeDifference / (1000 * 3600 * 24)
    })()

    for (let i = xAxisPoints; i >= 0; i -= 1) {
        const xAxisDay = new Date(today)
        xAxisDay.setDate(xAxisDay.getDate() - i)

        const year = xAxisDay.getFullYear()
        const month = (() => {
            const month = xAxisDay.getMonth() + 1
            if (month < 10) return '0' + month
            return month
        })()
        const day = xAxisDay.getDate()
        labels.push(`${year}-${month}-${day}`)

        const allWellsOnOrBeforeDay = wells.filter(w => (
            new Date(w.createdAt).getTime() <= xAxisDay.getTime()
        ))

        allWellsCumulative.push(allWellsOnOrBeforeDay.length)

        geolocatedWellsCumulative.push(allWellsOnOrBeforeDay.filter(w => (
            w.geolocation != null
        )).length)

        predictedWellsCumulative.push(allWellsOnOrBeforeDay.filter(w => (
            w.geolocation != null &&
            w.modelOutput != null
        )).length)
    }
    return {
        labels,
        allWellsCumulative,
        geolocatedWellsCumulative,
        predictedWellsCumulative,
    }
}

export default function Depth(): JSX.Element {
    const { getWells } = useWells();
    const { data: wells, isLoading, isError } = getWells();

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center">
                <CircularProgress />
            </Stack>
        );
    }

    if (isError || wells == null) {
        return <Typography>Something went wrong</Typography>;
    }

    const { 
        labels,
        allWellsBar,
        geolocatedBar,
        predictedBar,
    } = getBarChartData(wells)

    const {
        labels: lineLabels,
        allWellsCumulative,
        geolocatedWellsCumulative,
        predictedWellsCumulative,
    } = getLineChartData(wells)

    return (
        <>
            <TranslatableText
                english='Usage Charts'
                bengali='ব্যবহার পরিসংখ্যান'
                mb='1rem'
                variant='h4'
                textAlign='center'
            />

            <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                onClick={() => window.history.back()}
                sx={{ 
                    alignSelf: 'start',
                    mb: '32px',
                }}
            >
                <TranslatableText 
                    variant='body1' 
                    textAlign='center'
                    english='Return'
                    bengali='ফিরে যান' // chatgpt generated
                />
            </Button>

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
                            label: "Geolocated", 
                            data: geolocatedBar,
                        }, { 
                            label: "Geolocated & Predicted", 
                            data: predictedBar,
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
                <BarChart
                    className='bengali'
                    xAxis={[{ data: labels, scaleType: "band" }]}
                    series={[
                        { 
                            label: "সব নলকূপ", 
                            data: allWellsBar,
                        }, { 
                            label: "অবস্থানসহ নলকূপ", 
                            data: geolocatedBar,
                        }, { 
                            label: "অবস্থান ও পূর্বাভাস সহ নলকূপ", 
                            data: predictedBar,
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
                        { label: "Geolocated", data: geolocatedWellsCumulative },
                        { label: "Geolocated & Predicted", data: predictedWellsCumulative },
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
                        { label: "অবস্থানসহ নলকূপ", data: geolocatedWellsCumulative },
                        { label: "অবস্থান ও পূর্বাভাস সহ নলকূপ", data: predictedWellsCumulative },
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
        </>
    );
}

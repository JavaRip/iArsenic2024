import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useWells } from "../../hooks/useWells";
import TranslatableText from "../../components/TranslatableText";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartComponent from "./components/BarChart";
import LineChartComponent from "./components/LineChart";

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

            <BarChartComponent wells={wells} />

            <LineChartComponent wells={wells} />
        </>
    );
}

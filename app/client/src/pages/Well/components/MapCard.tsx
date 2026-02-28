import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import { RegionTranslations } from "../../../types";
import { Well } from "../../../models";
import useInteractiveMap from '../../Map/hooks/useInteractiveMap';
import { LatLngExpression } from 'leaflet';
import Markers from '../../Map/components/markers';
import { navigate } from 'wouter/use-browser-location';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsOffIcon from '@mui/icons-material/GpsOff';

export default function MapCard(
    {
        geolocation,
        geolocationType,
        regionTranslations,
        well,
    }: {
        geolocation: LatLngExpression,
        geolocationType: 'mouza' | 'gps'
        regionTranslations: RegionTranslations,
        well: Well,
    }
): JSX.Element {
    const {
        data: interactiveMap,
        isLoading: imLoading,
        error: imError,
    } = useInteractiveMap()

    if (imLoading) {
        return (
            <CircularProgress />
        );
    }

    if (imError) {
        return (
            <TranslatableText
                english="Error loading map"
                bengali="" // chatgpt generated
            />
        )
    }

    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Map"
                bengali="" // chatgpt generated
            />

            <Box
                sx={{
                    height: '400px',
                    maxWidth: '100%',
                    width: '400px',
                    position: 'relative',
                    mt: '32px',
                }}
            >
                <MapContainer
                    center={geolocation}
                    zoom={8}
                    scrollWheelZoom={true}
                    dragging={true}
                    doubleClickZoom={true}
                    keyboard={true}
                    zoomControl={true}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        crossOrigin="anonymous"
                    />
                    <Markers
                        wells={[well]}
                        regionTranslations={regionTranslations}
                        highlightId={null}
                        disablePointerEvents={false}
                    />
                </MapContainer>
            </Box>

            {(() => {
                switch(geolocationType) {
                    case 'gps':
                        return (
                            <Stack direction='row' mt='16px'>
                                <GpsFixedIcon sx={{ color: 'success.main' }} />
                                <TranslatableText
                                    color='success.main'
                                    fontWeight='bold'
                                    english='Coordinates from GPS (highly accurate)'
                                    bengali='জিপিএস থেকে প্রাপ্ত স্থানাঙ্ক (অত্যন্ত নির্ভুল)'
                                    ml='16px'
                                />
                            </Stack>
                        )
                    case 'mouza':
                        return (
                            <Stack direction='row' mt='16px'>
                                <GpsOffIcon sx={{ color: 'warning.main' }} />
                                <TranslatableText
                                    color='warning.main'
                                    fontWeight='bold'
                                    english='Coordinates from Mouza (approximate)'
                                    bengali='মৌজা থেকে প্রাপ্ত স্থানাঙ্ক (আনুমানিক)'
                                    ml='16px'
                                />
                            </Stack>
                        )
                }
            })()}

            <Button
                sx={{ width: '90%', height: '4rem', mt: '1rem' }}
                variant="outlined"
                onClick={() => navigate(`/map?highlight=${well.id}`)}
            >
                <TranslatableText
                    variant="body1"
                    english="View on map"
                    bengali="মানচিত্রে দেখুন"
                />
            </Button>
        </PageCard>
    )
}
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Button, CircularProgress } from "@mui/material";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import Map from '../../Map'
import { RegionTranslations } from "../../../types";
import { Well } from "../../../models";
import useInteractiveMap from '../../Map/hooks/useInteractiveMap';
import { LatLngExpression } from 'leaflet';
import Markers from '../../Map/components/markers';
import { navigate } from 'wouter/use-browser-location';

export default function MapCard(
    {
        regionTranslations,
        geolocation,
        well,
    }: {
        regionTranslations: RegionTranslations,
        geolocation: LatLngExpression,
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
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { CircularProgress, Stack, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { LatLngExpression, GeoJSON } from 'leaflet';
import { Well, WellSchema } from 'iarsenic-types';
import { RegionTranslations } from '../../types';
import RegionTranslationsFetcher from '../../utils/RegionTranslationsFetcher';
import Markers from './markers';
import UpaMap from './upaMap';
import { useAccessToken } from '../../utils/useAccessToken';
import MapInterface from './MapInterface';

type MapProps = {
    containerSx?: SxProps<Theme>;
    hideInterface?: boolean;
    disablePointerEvents?: boolean;
};

export default function Map({ 
    containerSx,
    hideInterface=false,
    disablePointerEvents=false,
}: MapProps) {
    const highlightId = new URLSearchParams(window.location.search).get('highlight');
    const position: LatLngExpression = [23.8041, 90.4152];

    const [interactiveMap, setInteractiveMap] = useState<GeoJSON>();
    const { data: token } = useAccessToken()
    const [wells, setWells] = useState<Well[]>();
    const [regionTranslations, setRegionTranslations] = useState<RegionTranslations>();
    const [drinkingOnly, setDrinkingOnly] = useState(false); // <-- NEW

    async function getInteractiveMap() {
        const res = await fetch(`/interactive-map.geojson`);
        const mapData = await res.json();
        setInteractiveMap(mapData);
    }

    async function getPredictionPinData() {
        const headers: HeadersInit = {}
        if (token) headers['authorization'] = `Bearer ${token.id}`

        const res = await fetch(`/api/v1/wells`, { headers });
        if (!res.ok) throw new Error(`Failed to fetch well data:, ${res}`);

        const data = await res.json();
        const parsedWells = data.wells.map((well: any) =>
            WellSchema.parse({
                ...well,
                createdAt: new Date(well.createdAt),
            })
        );

        setWells(parsedWells);
    }

    async function getRegionTranslations() {
        const translations = await RegionTranslationsFetcher();
        setRegionTranslations(translations);
    }

    useEffect(() => {
        getRegionTranslations();
        getInteractiveMap();
    }, []);

    useEffect(() => {
        getPredictionPinData();
    }, []);

    if (!interactiveMap || !regionTranslations || !wells) return (
        <Stack
            height={hideInterface ? "100%" : '100vh'}
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Stack>
    );

    const filteredWells = drinkingOnly
        ? wells.filter(w => w.wellInUse)
        : wells;

    return (
        <Stack 
            direction='column' 
            justifyContent='center' 
            alignItems='center'
            height='100vh'
            sx={{
                ...containerSx,
            }}
        >
            <MapContainer 
                center={position} 
                zoom={7} 
                scrollWheelZoom={!disablePointerEvents} 
                dragging={!disablePointerEvents}
                doubleClickZoom={!disablePointerEvents}
                keyboard={!disablePointerEvents}
                zoomControl={!hideInterface}
                style={{ 
                    height: '100%',
                    width: '100%',
                    pointerEvents: disablePointerEvents ? 'none' : 'auto',
                }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    crossOrigin="anonymous"
                />
                <UpaMap 
                    interactiveMap={interactiveMap}
                    disablePointerEvents={disablePointerEvents}
                    regionTranslations={regionTranslations}
                />
                <Markers 
                    wells={filteredWells} 
                    regionTranslations={regionTranslations} 
                    highlightId={highlightId}
                    disablePointerEvents={disablePointerEvents}
                />
            </MapContainer>

            {!hideInterface && (
                <MapInterface
                    drinkingOnly={drinkingOnly}
                    setDrinkingOnly={setDrinkingOnly}
                />
            )}
        </Stack>
    );
}

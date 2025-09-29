import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { CircularProgress, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import Markers from './markers';
import UpaMap from './upaMap';
import MapInterface from './MapInterface';
import useRegionTranslations from '../../hooks/useRegionTranslations';
import useInteractiveMap from './hooks/useInteractiveMap';
import { useWells } from '../../utils/useWells';

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
    const { 
        data: regionTranslations, 
        isLoading: rtLoading, 
        error: rtError,
    } = useRegionTranslations()

    const {
        data: interactiveMap,
        isLoading: imLoading,
        error: imError,
    } = useInteractiveMap()
  
    const { getWells } = useWells();
    const {
        data: wells,
        isLoading: wellsLoading,
        error: wellsError,
    } = getWells()

    const [drinkingOnly, setDrinkingOnly] = useState(false);
    const [dateRange, setDateRange] = useState<{ 
        from: string, 
        to: string,
    }>()

    if (imLoading || rtLoading || wellsLoading) return (
        <Stack
            height={hideInterface ? "100%" : '100vh'}
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Stack>
    );

    if (
        !wells || !regionTranslations || !interactiveMap ||
        rtError || imError || wellsError
    ) return (
        <Stack
            height={hideInterface ? "100%" : '100vh'}
            width="100%"
            justifyContent="center"
            alignItems="center"
        >
            <Typography>Error loading data for map</Typography>
        </Stack>
    )

    const availableDates = [
        ...new Set(wells.map(w => (
            String(w.createdAt).split('T')[0]
        )))
    ].sort()

    function toDayString(d: Date | string) {
        return (d instanceof Date ? d : new Date(d)).toISOString().split("T")[0];
    }

    const filteredWells = (() => {
        let list = wells;

        if (drinkingOnly) {
            list = list.filter(w => w.wellInUse);
        }

        if (dateRange?.from && dateRange?.to) {
            const { from, to } = dateRange; // both 'YYYY-MM-DD'
            list = list.filter(w => {
                const day = toDayString(w.createdAt);
                return day >= from && day <= to; // inclusive
            });
        }

        return list;
    })();

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
                    availableDates={availableDates}
                    setDrinkingOnly={setDrinkingOnly}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
            )}
        </Stack>
    );
}

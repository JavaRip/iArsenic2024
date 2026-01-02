export type FiltersType = {
    wellInUse: boolean;
    flooding: 'any' | 'yes' | 'no';
    staining: 'any' | 'black' | 'red';
    geolocated: boolean;
    hasImages: boolean;
    complete: boolean;
    aboveDepth: number;
    belowDepth: number;
    afterDate: string;
    beforeDate: string;
    ownWells: boolean;
    guestWells: 'only' | 'exclude' | 'any'
    region: {
        division: string;
        district: string;
        upazila: string;
        union: string;
        mouza: string;
    };
};

import { Well } from "../../../models";
import { FiltersType } from "../FiltersType";

export default function applyFilter(
    filters: FiltersType,
    wells: Well[],
    userId: string | undefined,
) {
    return wells.filter(w => {

        if (filters.wellInUse) {
            if (!w.wellInUse) return false
        }

        if (filters.flooding !== 'any') {
            if (w.flooding && (filters.flooding === 'no')) return false
            if (!w.flooding && (filters.flooding === 'yes')) return false
        }

        if (filters.staining !== 'any') {
            if (w.staining === 'not sure') {
                if (w.utensilStaining === 'black' && (filters.staining === 'red')) return false
                if (w.utensilStaining === 'red' && (filters.staining === 'black')) return false
            } else {
                if (w.staining === 'red' && (filters.staining === 'black')) return false
                if (w.staining === 'black' && (filters.staining === 'red')) return false
            }
        }

        if (filters.geolocated) {
            if (!w.geolocation) return false
        }

        if (filters.hasImages) {
            if (!w.imagePaths || w.imagePaths.length === 0) return false
        }

        if (filters.complete) {
            if (!w.modelOutput) return false
        }

        if (w.depth) {
            if (
                w.depth < filters.aboveDepth ||
                w.depth > filters.belowDepth
            ) {
                return false
            }
        }

        if (filters.ownWells) {
            if (w.userId !== userId) return false
        }

        if (
            filters.region.division &&
            w.division !== filters.region.division
        ) {
            return false
        }

        if (
            filters.region.district &&
            w.district !== filters.region.district
        ) {
            return false
        }

        if (
            filters.region.upazila &&
            w.upazila !== filters.region.upazila
        ) {
            return false
        }

        if (
            filters.region.union &&
            w.union !== filters.region.union
        ) {
            return false
        }

        if (
            filters.region.mouza &&
            w.mouza !== filters.region.mouza
        ) {
            return false
        }

        if (filters.guestWells !== 'any') {
            if (filters.guestWells === 'exclude') {
                if (w.userId === 'guest') return false
            }

            if (filters.guestWells === 'only') {
                if (w.userId !== 'guest') return false
            }
        }

        return true
    })
}
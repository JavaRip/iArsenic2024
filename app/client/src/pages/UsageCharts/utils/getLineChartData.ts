import { Well } from "iarsenic-types"

export default function getLineChartData(wells: Well[]) {
    const labels = []
    const allWellsCumulative = []
    const geolocatedWellsCumulative = []
    const predictedWellsCumulative = []
    const geolocatedPredictedWellsCumulative = []

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

        geolocatedPredictedWellsCumulative.push(allWellsOnOrBeforeDay.filter(w => (
            w.geolocation != null &&
            w.modelOutput != null
        )).length)

        predictedWellsCumulative.push(allWellsOnOrBeforeDay.filter(w => (
            w.modelOutput != null
        )).length)
    }
    return {
        labels,
        allWellsCumulative,
        geolocatedWellsCumulative,
        predictedWellsCumulative,
        geolocatedPredictedWellsCumulative,
    }
}
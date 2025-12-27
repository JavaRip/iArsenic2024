import { Well } from "../../../models"

export default function getBarChartData(wells: Well[]) {
    const labels = []
    const allWellsBar = []
    const geolocatedBar = []
    const geolocatedPredictedBar = []
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

        const geolocatedPredictedWellsOnDay = wellsOnDay.filter(w => (
            w.modelOutput != null && 
            w.geolocation != null
        ))

        const predictedWellsOnDay = wellsOnDay.filter(w => (
            w.modelOutput != null
        ))

        allWellsBar.push(wellsOnDay.length)
        geolocatedBar.push(geolocatedWellsOnDay.length)
        geolocatedPredictedBar.push(geolocatedPredictedWellsOnDay.length)
        predictedBar.push(predictedWellsOnDay.length)
    }

    return {
        labels,
        allWellsBar,
        geolocatedBar,
        geolocatedPredictedBar,
        predictedBar,
    }
}
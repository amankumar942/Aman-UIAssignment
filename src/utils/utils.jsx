export const calculatePoints = (amount) => {
    let points = 0
    if (amount > 100) {
        points = 2*(amount-100) + 1*50
    } else if (amount > 50 && amount <=100) {
        points = 1*(amount-50)
    }
    return Math.floor(points)
}

export const addPointsToData = (transactionsData) => {
    transactionsData?.forEach((element) => {
        const points = calculatePoints(element.amount)
        element.points = points
    })
    return transactionsData
}

export const calculateTotalPoints = (records) => {
    let totalPointsArray = []
    const lengthArray = [...new Set(records?.map(t =>t.name))]
    lengthArray.forEach((name) => {
        const individualRecords  = records.filter(val => val.name === name)
        const total = individualRecords?.reduce((total, item) => total + (item.points), 0)
        totalPointsArray = [...totalPointsArray, {total: total, name: name}]
    })
    return totalPointsArray
}
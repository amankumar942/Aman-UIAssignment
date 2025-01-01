export const fetchTransactionsData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Aman Kumar',
                    month: 'january',
                    amount: 120
                },
                {
                    id: 1,
                    name: 'Aman Kumar',
                    month: 'february',
                    amount: 100
                },
                {
                    id: 1,
                    name: 'Aman Kumar',
                    month: 'March',
                    amount: 75
                },
                {
                    id: 2,
                    name: 'Shubham Kumar',
                    month: 'january',
                    amount: 200
                },
                {
                    id: 2,
                    name: 'Shubham Kumar',
                    month: 'february',
                    amount: 35
                },
                {
                    id: 2,
                    name: 'Shubham Kumar',
                    month: 'March',
                    amount: 115
                },
                {
                    id: 3,
                    name: 'Rohan',
                    month: 'january',
                    amount: 200
                },
                {
                    id: 3,
                    name: 'Rohan',
                    month: 'february',
                    amount: 35
                },
                {
                    id: 3,
                    name: 'Rohan',
                    month: 'March',
                    amount: 115
                }
            ])
        }, 1000)
    })
}

export const calculatePoints = (amount) => {
    let points = 0
    if (amount > 100) {
        points = 2*(amount-100) + 1*50
    } else if (amount > 50 && amount <=100) {
        points = 1*(amount-50)
    }
    return points
}

export const addPointsToData = (transactionsData) => {
    transactionsData?.forEach((element) => {
        const points = calculatePoints(element.amount)
        element.points = points
    })
    return transactionsData
}

export const calculateTotalPoints = (records) => {
    return records?.reduce((total,item) => total + (item.points), 0)
}
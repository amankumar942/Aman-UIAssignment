import React, { useEffect, useState } from 'react'
import { addPointsToData, calculateTotalPoints, fetchTransactionsData } from '../utils/utils'
import '../styles/RewardsCalculator.css'

const RewardsCalculator = () => {
    const[transactionsData, setTransactionsData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const transactions = await fetchTransactionsData()
            setTransactionsData(transactions)
        }
        fetchData()
    }, [])    
    const dataWithPoints = addPointsToData(transactionsData)
    const lengthArray = [...new Set(dataWithPoints?.map(t =>t.id))]


    return (
        <div>
            <h1>Rewards Calculator</h1>
            {lengthArray?.map(id => {
                const displayRecords = dataWithPoints?.filter(val => val.id === id)
                const totalPoints = calculateTotalPoints(displayRecords)
                return (
                    <div className='table-container'>
                        <table border="1" className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Month</th>
                                    <th>Amount</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayRecords?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.month}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.points}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <h3>Total Points: {totalPoints}</h3>
                    </div>
                )
            })}
        </div>

    )
}
export default RewardsCalculator
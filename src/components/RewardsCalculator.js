import React, { useEffect, useState } from 'react'
import { addPointsToData, calculateTotalPoints } from '../utils/utils'
import axios from 'axios'
import '../styles/RewardsCalculator.css'

const RewardsCalculator = () => {
    const[transactionsData, setTransactionsData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get('http://localhost:3001/data')
                setTransactionsData(res.data)
            } catch (error) {
                console.log('error fetching data', error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])    
    const dataWithPoints = addPointsToData(transactionsData)
    const totalPoints = calculateTotalPoints(dataWithPoints)

    return (
        <div>
            <h1>Rewards Calculator</h1>
            {loading ? <div>Please wait the table is loading...</div> : 
            <div className='table-container'>
                <table border="1" className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Amount</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataWithPoints?.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.month}</td>
                                    <td>{item.year}</td>
                                    <td>{`$${item.amount}`}</td>
                                    <td>{item.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {totalPoints?.map(val => {
                    return (
                        <div className="totalPoints" key={val.name}>{`the total points earned by ${val.name} is: ${val.total}`}</div>
                    )
                })}
            </div>
            }
        </div>

    )
}
export default RewardsCalculator
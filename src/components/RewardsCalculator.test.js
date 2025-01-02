import React from 'react'
import RewardsCalculator from './RewardsCalculator'
import { act, findByText, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

jest.mock('axios')

const mockData = [
    {id: 1, name: 'Alice', month: 'january', year: '2002', amount: 120.00},
    {id: 2, name: 'Bob', month: 'january', year: '2003' , amount: 75.99},
    {id: 2, name: 'Bob', month: 'january', year: '2004' , amount: 200.00}
]

jest.mock('../utils/utils', () =>({
    addPointsToData: jest.fn((data) => data.map((item) => ({
        ...item,
        points: Math.floor(item.amount)
    }))),
    calculateTotalPoints: jest.fn((data) => data.reduce((total,item) => total +item.points, 0)
)
}))
describe('Rewards calculator test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('should render the heading correctly', () => {
        render(<RewardsCalculator />)
        expect(screen.getByText('Rewards Calculator')).toBeTruthy()
    })
    test('displays a loading message while fetching data', () => {
        axios.get.mockResolvedValueOnce({data: []})
        render(<RewardsCalculator />)
        expect(screen.getByText('Please wait the table is loading...')).toBeTruthy()
    })
    test('renders the table and displays transactions correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData} )
        render(<RewardsCalculator />)
        mockData.forEach((item) => {
            expect(screen.findByText(item.name)).toBeTruthy()
            expect(screen.findByText(item.month)).toBeTruthy()
            expect(screen.findByText(item.year)).toBeTruthy()
            expect(screen.findByText(`$${item.name}`)).toBeTruthy()
        })
    })
    test('renders table headers', async () => {
        render(<RewardsCalculator />)
        expect(screen.findByText('Id')).toBeTruthy()
        expect(screen.findByText('Name')).toBeTruthy()
        expect(screen.findByText('Amount')).toBeTruthy()
        expect(screen.findByText('Month')).toBeTruthy()
        expect(screen.findByText('Points')).toBeTruthy()
    })
    test('calculates and displays the toal points', async () => {
        axios.get.mockResolvedValueOnce({data: mockData})
        render(<RewardsCalculator />)
        expect(screen.findByText('the total points earned is:')).toBeTruthy()
    })
})
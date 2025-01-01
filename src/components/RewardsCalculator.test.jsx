import React from 'react'
import RewardsCalculator from './RewardsCalculator'
import { render, screen, waitFor } from '@testing-library/react'
import { addPointsToData, calculateTotalPoints, fetchTransactionsData } from '../utils/utils'

jest.mock('../utils/utils')


describe('Rewards calculator test suite', () => {
    const mockTransactions = [
        {id: 1, name: 'Alice', month: 'january', amount: 120, points: 90},
        {id: 2, name: 'Bob', month: 'february', amount: 75, points: 25}
    ]
    const mockTotalPoints = [115,200]
    beforeEach(() => {
        fetchTransactionsData.mockResolvedValue(mockTransactions)
        addPointsToData.mockImplementation((data) => data)
        calculateTotalPoints.mockReturnValue(mockTotalPoints)
    })

    // screen.debug()
    test('should render the heading correctly', () => {
        render(<RewardsCalculator />)
        expect(screen.getByText('Rewards Calculator')).toBeTruthy()
    })
    test('renders table headers', () => {
        render(<RewardsCalculator />)
        expect(screen.getByText('Id')).toBeTruthy()
        expect(screen.getByText('Name')).toBeTruthy()
        expect(screen.getByText('Amount')).toBeTruthy()
        expect(screen.getByText('Month')).toBeTruthy()
        expect(screen.getByText('Points')).toBeTruthy()
    })
    test('fetches and displays transactions data', async () => {
        render(<RewardsCalculator />)
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeTruthy()
            expect(screen.getByText('Bob')).toBeTruthy()
        })
    })
    test('fetches and displays all rows data', async () => {
        render(<RewardsCalculator />)
        await waitFor(() => {
            const rows =  screen.getAllByRole('row')
            expect(rows).toHaveLength(mockTransactions.length + 1)
        })
    })
})
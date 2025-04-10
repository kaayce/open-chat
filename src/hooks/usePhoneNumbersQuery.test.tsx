import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePhoneNumbersQuery } from './usePhoneNumbersQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '../api/phoneNumbers'

const mockPhoneData = {
  data: [
    {
      id: '1',
      number: '+1234567890',
      name: 'Main Line',
      formattedNumber: '(123) 456-7890',
      users: [
        { id: 'a', name: 'Alice', role: 'owner' },
        { id: 'b', name: 'Bob', role: 'member' },
      ],
    },
    {
      id: '2',
      number: '+1987654321',
      name: 'Support',
      formattedNumber: '(987) 654-3210',
      users: [
        { id: 'c', name: 'Carol', role: 'member' },
        { id: 'd', name: 'Dan', role: 'owner' },
      ],
    },
  ],
} as unknown as ListPhoneNumbersResponse

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

vi.mock('../api/phoneNumbers', () => {
  return {
    fetchPhoneNumbers: vi.fn(),
  }
})

describe('usePhoneNumbersQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and transforms phone numbers correctly', async () => {
    vi.spyOn(api, 'fetchPhoneNumbers').mockResolvedValueOnce(mockPhoneData)

    const { result } = renderHook(() => usePhoneNumbersQuery(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.phoneNumbers.length > 0)

    expect(api.fetchPhoneNumbers).toHaveBeenCalledTimes(1)
    expect(result.current.isPhoneNumbersLoading).toBe(false)

    expect(result.current.phoneNumbers).toEqual([
      {
        id: '1',
        number: '+1234567890',
        label: 'Main Line - (123) 456-7890',
      },
      {
        id: '2',
        number: '+1987654321',
        label: 'Support - (987) 654-3210',
      },
    ])

    expect(result.current.phoneIdToUsers['1']).toEqual([
      { id: 'a', name: 'Alice', role: 'owner' },
      { id: 'b', name: 'Bob', role: 'member' },
    ])

    expect(result.current.phoneIdToUsers['2']).toEqual([
      { id: 'd', name: 'Dan', role: 'owner' },
      { id: 'c', name: 'Carol', role: 'member' },
    ])
  })

  it('handles empty data safely', async () => {
    vi.spyOn(api, 'fetchPhoneNumbers').mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => usePhoneNumbersQuery(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => !result.current.isPhoneNumbersLoading)

    expect(result.current.phoneNumbers).toEqual([])
    expect(result.current.phoneIdToUsers).toEqual({})
  })
})

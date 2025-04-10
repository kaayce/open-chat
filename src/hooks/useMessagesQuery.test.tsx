import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMessagesQuery } from './useMessagesQuery'
import * as api from '@/api/messages'
import * as phoneHook from './usePhoneNumbersQuery'
import * as selectedPhoneHook from './useSelectedPhoneNumber'
import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Mocked = ReturnType<typeof vi.fn>

const mockMessages = {
  data: [
    { id: '1', text: 'Hello', userId: 'user1' },
    { id: '2', text: 'Hi', userId: 'user2' },
  ],
  totalItems: 2,
  nextPageToken: null,
}

const mockPhoneNumbers = [
  { id: 'phone1', number: '+1234567890' },
  { id: 'phone2', number: '+4561872364' },
]

const createWrapper = (): React.FC<PropsWithChildren> => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

vi.mock('@/api/messages', () => ({
  fetchMessages: vi.fn(),
}))

vi.mock('./usePhoneNumbersQuery', () => ({
  usePhoneNumbersQuery: vi.fn(),
}))

vi.mock('./useSelectedPhoneNumber', () => ({
  useSelectedPhoneNumber: vi.fn(),
}))

describe('useMessagesQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches messages and filters participants correctly', async () => {
    (selectedPhoneHook.useSelectedPhoneNumber as Mocked).mockReturnValue({
      selectedPhoneId: 'phone1',
      selectedPhoneNumber: '+1234567890',
    });

    (phoneHook.usePhoneNumbersQuery as Mocked)
      .mockReturnValue({
        phoneNumbers: mockPhoneNumbers,
      });

    (api.fetchMessages as Mocked)
      .mockResolvedValue(mockMessages);

    const wrapper = createWrapper()
    const { result } = renderHook(() => useMessagesQuery(), { wrapper })

    await waitFor(() => {
      expect(result.current.messages?.length).toBe(2)
    })

    expect(result.current.participants).toEqual(['+4561872364'])

    expect(api.fetchMessages).toHaveBeenCalledWith({
      phoneNumberId: 'phone1',
      participants: ['+4561872364'],
      maxResults: 10,
    })
  })

  it('does not fetch if selectedPhoneId or selectedPhoneNumber is missing', async () => {
    (selectedPhoneHook.useSelectedPhoneNumber as Mocked)
      .mockReturnValue({
        selectedPhoneId: null,
        selectedPhoneNumber: null,
      });

    (phoneHook.usePhoneNumbersQuery as Mocked)
      .mockReturnValue({
        phoneNumbers: mockPhoneNumbers,
      })

    const wrapper = createWrapper()
    renderHook(() => useMessagesQuery(), { wrapper })

    expect(api.fetchMessages).not.toHaveBeenCalled()
  })
})

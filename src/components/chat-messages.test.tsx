import { render, screen } from '@testing-library/react'
import { useMutationState } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ChatMessages } from './chat-messages'

vi.mock('@tanstack/react-query', () => ({
  useMutationState: vi.fn(),
}))


const mockUser = {
  email: 'test@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  groupId: 'g1',
  id: 'u1',
  role: 'member',
} satisfies User

const mockMessages: MessageDataItem[] = [
  {
    id: 'm1',
    to: ['+1234567890'],
    from: '+1098765432',
    text: 'Hello world!',
    phoneNumberId: 'pn1',
    direction: 'outgoing',
    userId: 'u1',
    status: 'sent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
describe('<ChatMessages />', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks()
  })

  it('renders messages correctly', () => {
    (useMutationState as any).mockReturnValue([])

    render(
      <ChatMessages
        messages={mockMessages}
        selectedPhoneId="pn1"
        users={[mockUser]}
      />
    )

    expect(screen.getByText('Hello world!')).toBeInTheDocument()
    expect(screen.getByText(/am|pm/i)).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument() // AvatarFallback
  })

  it('renders empty state when no messages', () => {
    (useMutationState as any).mockReturnValue([])

    render(
      <ChatMessages
        messages={[]}
        selectedPhoneId="pn1"
        users={[mockUser]}
      />
    )

    expect(screen.getByText(/No conversations yet/i)).toBeInTheDocument()
  })

  it('shows optimistic message when pending mutation exists', () => {
    (useMutationState as any).mockReturnValue([
      {
        variables: {
          content: 'Optimistic message!',
          from: '+1098765432',
          to: ['+1234567890'],
        },
        status: 'pending',
        submittedAt: Date.now(),
      },
    ])

    render(
      <ChatMessages
        messages={mockMessages}
        selectedPhoneId="pn1"
        users={[mockUser]}
      />
    )

    expect(screen.getByText('Optimistic message!')).toBeInTheDocument()
  })
})

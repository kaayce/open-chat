import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatInput } from './chat-input'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

const mockMutate = vi.fn()
vi.mock('@/hooks/useSendMessageMutation', () => ({
  useSendMessageMutation: () => ({
    isPending: false,
    mutate: mockMutate,
  }),
}))

const defaultProps = {
  from: 'user123',
  to: ['recipient456'],
}

describe('ChatInput', () => {
  beforeEach(() => {
    mockMutate.mockReset()
  })

  it('renders textarea and button', () => {
    render(<ChatInput {...defaultProps} />)
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows validation error for empty input', async () => {
    const user = userEvent.setup()
    render(<ChatInput {...defaultProps} />)

    await user.click(screen.getByRole('button'))

    expect(
      await screen.findByText('Message cannot be empty')
    ).toBeInTheDocument()
  })

  it('shows validation error for overly long message', async () => {
    const user = userEvent.setup()
    render(<ChatInput {...defaultProps} />)

    const textarea = screen.getByPlaceholderText('Type a message...')
    await user.type(textarea, 'a'.repeat(1601))

    await user.click(screen.getByRole('button'))

    expect(
      await screen.findByText('Message too long - max 1600 characters')
    ).toBeInTheDocument()
  })

  it('calls mutate with valid message', async () => {
    const user = userEvent.setup()
    render(<ChatInput {...defaultProps} />)

    const textarea = screen.getByPlaceholderText('Type a message...')
    await user.type(textarea, 'Hello world!')

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          content: 'Hello world!',
          from: 'user123',
          to: ['recipient456'],
        },
        expect.any(Object)
      )
    })
  })

  it('resets form on success', async () => {
    const user = userEvent.setup()

    const resetMock = vi.fn()
    const formReset = HTMLFormElement.prototype.reset
    HTMLFormElement.prototype.reset = resetMock

    mockMutate.mockImplementation((_data, { onSuccess }: any) => {
      onSuccess()
    })

    render(<ChatInput {...defaultProps} />)

    const textarea = screen.getByPlaceholderText('Type a message...')
    await user.type(textarea, 'Hi')

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(resetMock).toHaveBeenCalled()
    })

    HTMLFormElement.prototype.reset = formReset
  })

  it('shows error toast on mutation failure', async () => {
    const toast = await import('sonner')
    mockMutate.mockImplementation((_data, { onError }: any) => {
      onError()
    })

    const user = userEvent.setup()
    render(<ChatInput {...defaultProps} />)

    const textarea = screen.getByPlaceholderText('Type a message...')
    await user.type(textarea, 'Test message')

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(toast.toast.error).toHaveBeenCalledWith('Error sending message')
    })
  })
})

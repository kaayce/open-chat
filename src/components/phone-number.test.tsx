import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PhoneNumber } from './phone-number'
import userEvent from '@testing-library/user-event'

describe('PhoneNumber', () => {
  const mockSetSelectedPhoneId = vi.fn()

  const phoneNumber = {
    id: 'phone1',
    number: '+1234567890',
    label: 'Home',
  }

  it('should render phone number label correctly', () => {
    render(
      <PhoneNumber
        phoneNumber={phoneNumber}
        selectedPhoneNumberId={null}
        setSelectedPhoneId={mockSetSelectedPhoneId}
      />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should highlight the selected phone number', () => {
    render(
      <PhoneNumber
        phoneNumber={phoneNumber}
        selectedPhoneNumberId="phone1"
        setSelectedPhoneId={mockSetSelectedPhoneId}
      />
    )

    const sidebarMenuItem = screen.getByRole('button', { name: 'Home' })
    expect(sidebarMenuItem).toHaveClass('bg-purple-500')
    expect(sidebarMenuItem).toHaveClass('text-white')
  })

  it('should not highlight if not selected', () => {
    render(
      <PhoneNumber
        phoneNumber={phoneNumber}
        selectedPhoneNumberId="phone2"
        setSelectedPhoneId={mockSetSelectedPhoneId}
      />
    )

    const sidebarMenuItem = screen.getByRole('button', { name: 'Home' })
    expect(sidebarMenuItem).toHaveClass('hover:bg-secondary')
    expect(sidebarMenuItem).not.toHaveClass('bg-purple-500')
  })

  it('should call setSelectedPhoneId when clicked', async () => {
    render(
      <PhoneNumber
        phoneNumber={phoneNumber}
        selectedPhoneNumberId={null}
        setSelectedPhoneId={mockSetSelectedPhoneId}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'Home' }))

    expect(mockSetSelectedPhoneId).toHaveBeenCalledWith('phone1')
  })
})
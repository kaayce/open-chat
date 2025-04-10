import { render, screen } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import '@testing-library/jest-dom'
import { User } from './user'

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  role: 'owner',
} as User

const mockUserWithRoleMember = {
  firstName: 'Jane',
  lastName: 'Smith',
  role: 'member',
} as User

describe('User Component', () => {
  test('renders initials in AvatarFallback', () => {
    render(<User user={mockUser} />)

    const avatarFallback = screen.getByText('JD')
    expect(avatarFallback).toBeInTheDocument()
  })

  test('renders the full name correctly', () => {
    render(<User user={mockUser} />)

    const fullName = screen.getByText('John Doe')
    expect(fullName).toBeInTheDocument()
  })

  test('displays the correct badge for "owner" role', () => {
    render(<User user={mockUser} />)

    const badge = screen.getByText('owner')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-purple-100 text-purple-800')
  })

  test('displays the correct badge for "member" role', () => {
    render(<User user={mockUserWithRoleMember} />)

    const badge = screen.getByText('member')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-gray-100 text-gray-800')
  })
})

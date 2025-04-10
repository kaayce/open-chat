import { type APIErrorResponse } from '../interfaces/ErrorResponse'

export const BASE_URL = 'https://api.openphone.com/'

export const apiFetch = async <T = unknown>(
  segment: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = new URL(segment, BASE_URL)
    const headers = {
      ...options.headers,
      Authorization: `${process.env.OPENPHONE_API_KEY}`,
      'Content-Type': 'application/json',
    }

    const updatedOptions = {
      headers,
      ...options,
    }

    const res = await fetch(url, updatedOptions)

    if (!res.ok) {
      const errorData = (await res.json()) as APIErrorResponse
      console.error('API Error Response:', errorData)
      throw new Error(
        `API Error ${res.status}: ${
          errorData.message ?? 'An unknown API error occurred'
        }`
      )
    }

    return (await res.json()) as T
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('API Fetch Error:', message)
    throw new Error(message)
  }
}

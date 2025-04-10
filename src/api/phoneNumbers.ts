import qs from 'qs'
import { API_URL } from '../lib/constants'

const phoneNumberEndpoint = '/phone-numbers'

export const fetchPhoneNumbers = async (
  params?: ListPhoneNumbersRequestParams
): Promise<ListPhoneNumbersResponse> => {
  try {
    const baseUrl = `${API_URL}${phoneNumberEndpoint}`
    const url = new URL(baseUrl)

    if (params) {
      url.search = qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
        addQueryPrefix: true,
      })
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch phone numbers')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching phone numbers:', error)
    throw error
  }
}

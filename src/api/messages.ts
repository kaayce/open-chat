import qs from 'qs'
import { API_URL } from '../lib/constants'

const messagesEndpoint = '/messages'
const baseUrl = `${API_URL}${messagesEndpoint}`
const url = new URL(baseUrl)

export const fetchMessages = async (
  params: ListMessagesRequestParams
): Promise<ListMessagesResponse> => {
  try {
    if (params) {
      url.search = qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
        addQueryPrefix: true,
      })
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}

export const sendMessages = async (
  params: SendMessageRequestBody
): Promise<SendMessageResponse> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to send messages')
    }
    return response.json()
  } catch (error) {
    console.error('Error sending messages:', error)
    throw error
  }
}

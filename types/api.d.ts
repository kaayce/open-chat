interface User {
  email: string
  firstName: string
  groupId: string
  id: string
  lastName: string
  role: 'member' | 'owner'
}

interface RestrictionsDetail {
  CA: 'unrestricted'
  US: 'unrestricted'
  Intl: 'restricted'
}

interface Restrictions {
  messaging: RestrictionsDetail
  calling: RestrictionsDetail
}

interface PhoneNumberData {
  id: string
  groupId: string
  createdAt: string
  updatedAt: string
  name: string
  number: string
  formattedNumber: string
  forward: null
  portRequestId: null
  portingStatus: null
  symbol: string
  users: User[]
  restrictions: Restrictions
}

interface MessageDataItem {
  id: string
  to: string[]
  from: string
  text: string
  phoneNumberId: string | null
  direction: 'incoming' | 'outgoing'
  userId: string | null // Null for incoming messages
  status: 'queued' | 'sent' | 'delivered' | 'undelivered'
  createdAt: string // ISO 8601 format
  updatedAt: string // ISO 8601 format
}

interface ListMessagesRequestParams {
  phoneNumberId: string
  userId?: string
  participants: string[]
  createdAfter?: string
  createdBefore?: string
  maxResults: number
  pageToken?: string
}
interface ListMessagesResponse {
  data: MessageDataItem[]
  totalItems: number
  nextPageToken: string | null
}

interface SendMessageRequestBody {
  content: string
  from: string
  to: string[]
  userId?: string
  setInboxStatus?: 'done'
}

interface SendMessageResponse {
  data: {
    id: string
    to: string[]
    from: string
    text: string
    phoneNumberId: string | null
    direction: 'incoming' | 'outgoing'
    userId: string
    status: 'queued' | 'sent' | 'delivered' | 'undelivered'
    createdAt: string
    updatedAt: string
  }
}

interface ListPhoneNumbersRequestParams {
  userId?: string
}

interface ListPhoneNumbersResponse {
  data: PhoneNumberData[]
}


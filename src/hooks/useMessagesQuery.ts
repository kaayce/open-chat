import { fetchMessages } from '@/api/messages'
import { useQuery } from '@tanstack/react-query'
import { useSelectedPhoneNumber } from './useSelectedPhoneNumber'
import { usePhoneNumbersQuery } from './usePhoneNumbersQuery'
import { useMemo } from 'react'

const selectLatest = (data: ListMessagesResponse): ListMessagesResponse => ({
  ...data,
  data: data.data.toReversed(),
})

export const useMessagesQuery = () => {
  const { selectedPhoneId, selectedPhoneNumber } = useSelectedPhoneNumber()
  const { phoneNumbers } = usePhoneNumbersQuery()

  const participants = useMemo(
    () =>
      phoneNumbers.filter((p) => p.id !== selectedPhoneId).map((p) => p.number),
    [phoneNumbers, selectedPhoneId]
  )

  const { data, isLoading } = useQuery({
    queryKey: ['get-messages', selectedPhoneId, participants],
    queryFn: () =>
      fetchMessages({
        phoneNumberId: selectedPhoneId!,
        participants: participants,
        maxResults: 10,
      }),
    enabled:
      !!selectedPhoneId && !!participants.length && !!selectedPhoneNumber,
    select: selectLatest,
  })

  return {
    messages: data?.data,
    nextPageToken: data?.nextPageToken,
    isMessagesLoading: isLoading,
    participants,
  }
}

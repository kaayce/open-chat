import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPhoneNumbers } from '../api/phoneNumbers'

export function usePhoneNumbersQuery(params?: ListPhoneNumbersRequestParams) {
  const { data, isLoading } = useQuery({
    queryKey: ['get-phoneNumbers', params],
    queryFn: () => fetchPhoneNumbers(params),
  })

  const phoneNumbers = useMemo(
    () =>
      data?.data?.map((d) => ({
        id: d.id,
        number: d.number,
        label: `${d.name} - ${d.formattedNumber}`,
      })) ?? [],
    [data?.data]
  )

  const phoneIdToUsers = useMemo(
    () =>
      data?.data?.reduce((acc, phone) => {
        acc[phone.id] = phone.users.toSorted((u) =>
          u.role === 'owner' ? -1 : 1
        )
        return acc
      }, {} as Record<string, User[]>) ?? {},
    [data?.data]
  )

  return {
    phoneNumbers,
    isPhoneNumbersLoading: isLoading,
    phoneIdToUsers,
  }
}

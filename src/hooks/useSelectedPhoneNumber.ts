import { useMemo, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { usePhoneNumbersQuery } from './usePhoneNumbersQuery'

export const useSelectedPhoneNumber = () => {
  const { phoneId } = useParams()
  const navigate = useNavigate()
  const { phoneNumbers } = usePhoneNumbersQuery()

  useEffect(() => {
    if (!phoneId && phoneNumbers?.length > 0) {
      navigate(`/phone/${phoneNumbers[0].id}`)
    }
  }, [phoneId, phoneNumbers, navigate])

  const selectedPhoneNumber = useMemo(() => {
    if (!phoneId || !phoneNumbers) return null
    return phoneNumbers.find((p) => p.id === phoneId)?.number ?? null
  }, [phoneNumbers, phoneId])

  const setSelectedPhoneId = useCallback(
    (phoneId: string) => {
      navigate(`/phone/${phoneId}`)
    },
    [navigate]
  )

  return {
    selectedPhoneId: phoneId,
    selectedPhoneNumber,
    setSelectedPhoneId,
  }
}

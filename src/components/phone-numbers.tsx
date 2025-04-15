import { PhoneNumber } from './phone-number'

type PhoneNumbersProps = {
  phoneNumbers: {
    id: string
    number: string
    label: string
  }[]
  selectedPhoneNumberId: string
  setSelectedPhoneId: (id: string) => void
}

export const PhoneNumbers = ({
  phoneNumbers,
  selectedPhoneNumberId,
  setSelectedPhoneId,
}: PhoneNumbersProps) => {
  if (phoneNumbers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground px-2 py-1">
        No phone numbers available
      </div>
    )
  }

  return (
    <>
      {phoneNumbers.map((phoneNumber) => (
        <PhoneNumber
          key={phoneNumber.id}
          phoneNumber={phoneNumber}
          selectedPhoneNumberId={selectedPhoneNumberId}
          setSelectedPhoneId={setSelectedPhoneId}
        />
      ))}
    </>
  )
}

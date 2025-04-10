import { SidebarMenuItem } from './ui/sidebar'

interface PhoneNumberProps {
  phoneNumber: { id: string; number: string; label: string }
  selectedPhoneNumberId: string | null
  setSelectedPhoneId: (id: string) => void
}

export function PhoneNumber({
  phoneNumber,
  selectedPhoneNumberId,
  setSelectedPhoneId,
}: PhoneNumberProps) {
  return (
    <SidebarMenuItem
      role="button"
      key={phoneNumber.id}
      className={`flex flex-col p-3 rounded-md transition-colors text-left cursor-pointer ${
        selectedPhoneNumberId === phoneNumber.id
          ? 'bg-purple-500 text-white'
          : 'hover:bg-secondary'
      }`}
      onClick={() => setSelectedPhoneId(phoneNumber.id)}
    >
      <div className="flex justify-between items-start">
        <span className="font-medium text-md">{phoneNumber.label}</span>
      </div>
    </SidebarMenuItem>
  )
}

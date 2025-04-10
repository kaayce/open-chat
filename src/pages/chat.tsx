import { usePhoneNumbersQuery } from '@/hooks/usePhoneNumbersQuery'
import { useMessagesQuery } from '@/hooks/useMessagesQuery'
import { useSelectedPhoneNumber } from '@/hooks/useSelectedPhoneNumber'
import { ChatMessages } from '@/components/chat-messages'
import { ChatInput } from '@/components/chat-input'

export default function Chat() {
  const { selectedPhoneNumber, selectedPhoneId } = useSelectedPhoneNumber()
  const { phoneIdToUsers } = usePhoneNumbersQuery()
  const { messages, participants } = useMessagesQuery()

  if (!messages || !selectedPhoneNumber || !selectedPhoneId) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessages
        messages={messages}
        selectedPhoneId={selectedPhoneId}
        users={phoneIdToUsers[selectedPhoneId] ?? []}
      />
      <ChatInput from={selectedPhoneNumber} to={participants} />
    </div>
  )
}

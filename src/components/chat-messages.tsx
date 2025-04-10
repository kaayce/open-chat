import dayjs from 'dayjs'
import { useMutationState, type MutationStatus } from '@tanstack/react-query'
import { isToday } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useMemo } from 'react'

type PendingSendMessage = {
  variables: SendMessageRequestBody
  status: MutationStatus
  submittedAt: number
}

interface ChatMessagesProps {
  messages: MessageDataItem[]
  selectedPhoneId: string
  users: User[]
}

export const ChatMessages = ({
  messages,
  selectedPhoneId,
  users,
}: ChatMessagesProps) => {
  const mutations = useMutationState<PendingSendMessage>({
    filters: { mutationKey: ['send-message'] },
    select: (mutation) => ({
      variables: mutation.state.variables as SendMessageRequestBody,
      status: mutation.state.status,
      submittedAt: mutation.state.submittedAt,
    }),
  })
  const latestPendingMutation = mutations.filter(
    (m) => m.status === 'pending'
  )?.[mutations.length - 1]

  const optimisticUserId = useMemo(() => Object.values(users)[0]?.id, [users])

  const optimisticMessages = useMemo(() => {
    return latestPendingMutation
      ? [
          ...messages,
          createMessage(
            latestPendingMutation.variables,
            selectedPhoneId,
            optimisticUserId
          ),
        ]
      : messages
  }, [latestPendingMutation, messages, selectedPhoneId, optimisticUserId])

  if (!messages.length) {
    return (
      <div className="flex flex-col gap-4 p-4 overflow-y-auto text-center">
        No conversations yet 🥺
      </div>
    )
  }

  const userById = users.reduce((acc, user) => {
    if (!acc[user.id]) {
      acc[user.id] = user
    }
    return acc
  }, {} as Record<string, User>)

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto grow">
      {optimisticMessages.map((message) => {
        // note: `message.userId` is not always available (null for incoming messages)
        const user = message.userId ? userById?.[message.userId] : null
        return (
          <div
            key={message.id}
            className={`flex gap-3 items-start ${
              message.direction === 'outgoing' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={cn(
                'relative',
                'w-fit',
                'max-w-[80%]',
                'md:max-w-[40%]',
                'min-w-[20%]',
                'break-words',
                'rounded-2xl',
                'py-2',
                'px-4',
                'shadow-md',
                'space-y-4',
                'align-top',
                message.direction === 'outgoing'
                  ? 'bg-purple-500 text-white ml-auto'
                  : 'bg-white text-black mr-auto'
              )}
            >
              <div className="text-md whitespace-pre-wrap">{message.text}</div>
              <div
                className={`text-xs text-end ${
                  message.direction === 'outgoing'
                    ? 'text-gray-100'
                    : 'text-gray-400'
                }`}
              >
                {isToday(message.createdAt)
                  ? dayjs(message.createdAt).format('h:mma')
                  : dayjs(message.createdAt).format('YYYY/MM/DD, h:mma')}
              </div>
            </div>
            {message.direction === 'outgoing' && user && (
              <div className="flex items-center gap-2 text-black justify-end">
                <Avatar className="text-xs border-2 border-gray-200">
                  <AvatarFallback>
                    {user.firstName[0] + user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        )
      })}{' '}
    </div>
  )
}
function createMessage(
  params: SendMessageRequestBody,
  selectedPhoneId: string,
  userId: string
): MessageDataItem {
  return {
    id: `new-message-${Date.now()}`,
    from: params.from,
    to: params.to,
    text: params.content,
    phoneNumberId: selectedPhoneId,
    direction: 'outgoing',
    userId,
    status: 'queued',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

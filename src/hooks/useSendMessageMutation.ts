import { sendMessages } from '@/api/messages'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: SendMessageRequestBody) => sendMessages(params),
    mutationKey: ['send-message'],
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ['get-messages'] })
    },
  })
}

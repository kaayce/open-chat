import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { useSendMessageMutation } from '@/hooks/useSendMessageMutation'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'
import { Textarea } from './ui/textarea'

export const SendMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1600, 'Message too long - max 1600 characters'),
})

interface ChatInputProps {
  from: string
  to: string[]
}

export const ChatInput = ({ from, to }: ChatInputProps) => {
  const [error, setError] = useState('')
  const { isPending, mutate } = useSendMessageMutation()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form as HTMLFormElement)

    const data = Object.fromEntries(formData)

    try {
      const result = SendMessageSchema.safeParse(data)

      if (!result.success) {
        toast.error(result.error.errors[0].message)
        setError(result.error.errors[0].message)
        return
      } else {
        setError('')
      }

      const messageBody: SendMessageRequestBody = {
        content: result.data.content,
        from,
        to,
      }

      mutate(messageBody, {
        onSuccess: () => (form as HTMLFormElement).reset(),
        onError: () => toast.error('Error sending message'),
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred while submitting the form.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 p-4 border-t border-gray-300"
    >
      <div className="flex-grow">
        <Textarea
          name="content"
          autoComplete="off"
          placeholder="Type a message..."
          className={`w-full max-h-30 min-h-[4rem] rounded-md px-4 py-3 resize-none overflow-y-auto
          focus:outline-none focus:ring-2 focus:ring-purple-500
          selection:bg-purple-200 selection:text-black
          ${error ? 'border-red-500' : ''}
        `}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className={`cursor-pointer bg-purple-500 hover:bg-purple-500
          ${isPending && 'bg-gray-500'}`}
      >
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </form>
  )
}

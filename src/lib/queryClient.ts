import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: () => toast.error(`Something went wrong`),
    }),
    defaultOptions: {
      queries: {
        placeholderData: (prev: unknown) => prev,
        notifyOnChangeProps: ['data', 'error'],
        retry: (failureCount, error: Error) => {
          if (
            error.message.includes('401') ||
            error.message.includes('Unauthorized')
          ) {
            return false
          }

          return failureCount < 3
        },
      },
    },
  })

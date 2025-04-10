import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () =>
  new QueryClient({
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

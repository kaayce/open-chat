import { Router, type Request, Response } from 'express'
import qs from 'qs'
import { apiFetch } from '../lib/apiFetch'
import { type APIErrorResponse } from '../interfaces/ErrorResponse'

const router = Router()
const MESSAGES_ENDPOINT = '/v1/messages'

router.get('/', async (req: Request, res: Response) => {
  const {
    userId,
    phoneNumberId,
    participants,
    createdAfter,
    createdBefore,
    maxResults,
    pageToken,
  } = req.query as unknown as ListMessagesRequestParams

  if (typeof phoneNumberId !== 'string') {
    res.status(400).json({ message: '"phoneNumberId" is required.' })
    return
  }

  if (!participants) {
    res.status(400).json({ message: '"participants" is required' })
    return
  }

  if (!maxResults || isNaN(Number(maxResults))) {
    res
      .status(400)
      .json({ message: '"maxResults" is required and must be a valid number.' })
    return
  }

  const queryString = qs.stringify(
    {
      phoneNumberId,
      participants,
      userId,
      createdAfter,
      createdBefore,
      maxResults,
      pageToken,
    },
    {
      arrayFormat: 'repeat',
      skipNulls: true,
      addQueryPrefix: true,
    }
  )

  try {
    const response = await apiFetch<ListMessagesResponse>(
      `${MESSAGES_ENDPOINT}${queryString}`
    )
    res.json(response)
  } catch (err: unknown) {
    const error = err as APIErrorResponse
    const statusCode = error.status ?? 500
    res.status(statusCode).json(error)
  }
})

router.post(
  '/',
  async (req: Request<{}, {}, SendMessageRequestBody>, res: Response) => {
    const { content, from, to, userId, setInboxStatus } = req.body

    if (!content || content.length < 1 || content.length > 1600) {
      res.status(400).json({
        message:
          'The "content" must be provided and be between 1 and 1600 characters.',
      })
      return
    }

    if (!from) {
      res.status(400).json({
        message: '"from" must be provided.',
      })
      return
    }

    if (!to) {
      res.status(400).json({
        message:
          'The "to" field must be provided and be a non-empty array of phone numbers.',
      })
      return
    }

    try {
      const response = await apiFetch<ListMessagesResponse>(MESSAGES_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          content,
          from,
          to,
          userId,
          setInboxStatus,
        }),
      })
      res.status(202).json(response)
    } catch (err: unknown) {
      const error = err as APIErrorResponse
      const statusCode = error.status ?? 500
      res.status(statusCode).json(error)
    }
  }
)

export default router

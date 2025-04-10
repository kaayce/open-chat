import { Router, type Request, Response } from 'express'
import { apiFetch } from '../lib/apiFetch'
import { type APIErrorResponse } from '../interfaces/ErrorResponse'
import qs from 'qs'

const router = Router()
const PHONE_NUMBERS_ENDPOINT = '/v1/phone-numbers'

router.get('/', async (req: Request, res: Response) => {
  const queryParams = req.query as ListPhoneNumbersRequestParams
  const queryString = qs.stringify(queryParams, {
    arrayFormat: 'repeat',
    skipNulls: true,
    addQueryPrefix: true,
  })
  try {
    const response = await apiFetch<ListPhoneNumbersResponse>(
      `${PHONE_NUMBERS_ENDPOINT}${queryString}`
    )
    res.json(response)
  } catch (err: unknown) {
    const error = err as APIErrorResponse
    const statusCode = error.status ?? 500
    res.status(statusCode).json(error)
  }
})

export default router

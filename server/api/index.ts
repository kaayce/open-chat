import { Router, type Response } from 'express'

import MessageResponse from '../interfaces/MessageResponse'
import phoneNumbers from './phoneNumbers'
import messages from './messages'

const router = Router()

router.get<unknown, MessageResponse>('/', (_, res: Response) => {
  res.json({
    message: 'OpenChat API - 👋🏿🌎🌍🌏',
  })
})

router.use('/messages', messages)
router.use('/phone-numbers', phoneNumbers)

export default router

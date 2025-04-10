import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import qs from 'qs'

import * as middlewares from './middlewares'
import api from './api'
import MessageResponse from './interfaces/MessageResponse'

const port = process.env.SERVER_PORT ?? 9000
const app = express()

app.set('query parser', (str: string) =>
  qs.parse(str, { comma: false, allowDots: true })
)

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get<unknown, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🏿🌎🌍🌏✨🌈🦄',
  })
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => {
  console.log(`Proxy Server listening on: http://localhost:${port}`)
})

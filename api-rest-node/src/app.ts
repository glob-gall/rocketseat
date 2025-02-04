import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify({ logger: true })
app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

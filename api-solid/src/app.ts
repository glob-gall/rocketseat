import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { checkinsRoutes } from './http/controllers/checkins/routes'
import { fastifyCookie } from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt,{
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m',
  }
})

app.register(gymsRoutes)
app.register(usersRoutes)
app.register(fastifyCookie)
app.register(checkinsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.', issue: error.format()
    })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error);
    
  } else {
    // TODO: shold log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.'})
})

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials"
import { makeAuthenticateUsecase } from "@/use-cases/factories/make-authenticate-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest,reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  })

  const dto = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUsecase = makeAuthenticateUsecase()
    const {user} = await authenticateUsecase.exec(dto)
    
    const token = await reply.jwtSign({
      role: user.role,
    },
    {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign({
      role: user.role
    },{
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    })

    reply.status(200)
    .setCookie('refreshToken', refreshToken, {
      path:'/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .send({token})

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send()
    }
    throw err
  }
}
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists"
import { makeRegisterUsecase } from "@/use-cases/factories/make-register-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(req: FastifyRequest,reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
  })

  const dto = registerBodySchema.parse(req.body)

  try {
    const registerUsecase = makeRegisterUsecase()
    await registerUsecase.exec(dto)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.status(409).send()
    }
    throw err
  }
  reply.status(201).send()
}
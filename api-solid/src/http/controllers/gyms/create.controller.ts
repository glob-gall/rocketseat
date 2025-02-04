import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists"
import { makeCreateGymUsecase } from "@/use-cases/factories/make-create-gym-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createGym(req: FastifyRequest,reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const {
    title,
    description,
    latitude,
    longitude,
    phone,
  } = createGymBodySchema.parse(req.body)

  
  const createGym = makeCreateGymUsecase()
  await createGym.exec({
    title,
    description,
    latitude,
    longitude,
    phone,
  })

  reply.status(201).send()
}
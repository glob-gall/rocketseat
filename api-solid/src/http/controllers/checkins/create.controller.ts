import { makeCheckinUsecase } from "@/use-cases/factories/make-check-in-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createCheckin(req: FastifyRequest,reply: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string(),
  })
  const createCheckinBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = createCheckinBodySchema.parse(req.body)
  const { gymId } = createCheckinParamsSchema.parse(req.params)

  const checkin = makeCheckinUsecase()
  await checkin.exec({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  reply.status(201).send()
}
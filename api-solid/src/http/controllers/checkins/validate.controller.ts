import { makeCheckinUsecase } from "@/use-cases/factories/make-check-in-usecase"
import { makeValidateCheckinUseCase } from "@/use-cases/factories/make-validate-check-in-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function validateCheckin(req: FastifyRequest,reply: FastifyReply) {

  const validateCheckinParamsSchema = z.object({
    checkinId: z.string()
  })

  const { checkinId } = validateCheckinParamsSchema.parse(req.params)

  const checkin = makeValidateCheckinUseCase()
  await checkin.exec({
    checkinId
  })

  reply.status(204).send()
}
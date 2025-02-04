import { makeFetchUserCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-users-check-ins-history-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function checkinHistory(req: FastifyRequest,reply: FastifyReply) {
  const checkinHistoryParamsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryParamsSchema.parse(req.query)

  const checkin = makeFetchUserCheckinHistoryUseCase()
  const {checkIns} = await checkin.exec({
    userId: req.user.sub,
    page
  })

  reply.status(200).send({checkIns})
}
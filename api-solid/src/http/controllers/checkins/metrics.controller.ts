import { makeGetUserMetricsUsecase } from "@/use-cases/factories/make-get-user-metrics-usecase"
import { FastifyReply, FastifyRequest } from "fastify"

export async function checkinMetrics(req: FastifyRequest,reply: FastifyReply) {


  const getUserMetrics = makeGetUserMetricsUsecase()
  const {checkinsCount} = await getUserMetrics.exec({
    userId: req.user.sub
  })

  reply.status(200).send({checkinsCount})
}
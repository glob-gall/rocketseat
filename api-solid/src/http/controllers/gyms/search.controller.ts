import { makeSearchGymUsecase } from "@/use-cases/factories/make-search-gyms-usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function searchGym(req: FastifyRequest,reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const {
    query,
    page,
  } = searchGymQuerySchema.parse(req.query)

  
  const searchGym = makeSearchGymUsecase()
  const {gyms} = await searchGym.exec({
    page,
    query
  })

  reply.status(200).send({
    gyms
  })
}
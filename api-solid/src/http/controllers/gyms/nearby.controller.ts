import { makeFetchNearbyGymsUsecase } from "@/use-cases/factories/make-fetch-nearby-gyms.usecase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetchNearbyGyms(req: FastifyRequest,reply: FastifyReply) {
  const fetchNearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = fetchNearbyGymsQuerySchema.parse(req.query)
  
  const createGym = makeFetchNearbyGymsUsecase()
  const {gyms} = await createGym.exec({
    userLatitude: latitude,
    userLongitude: longitude
  })
    
  reply.status(200).send({
    gyms
  })
}
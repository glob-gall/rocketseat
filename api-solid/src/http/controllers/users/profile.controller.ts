
import { makeGetUserProfileUsecase } from "@/use-cases/factories/make-get-user-profile.usecase"
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile.usecase"
import { FastifyReply, FastifyRequest } from "fastify"

export async function profile(req: FastifyRequest,reply: FastifyReply) {
  
  const getuserProfile = makeGetUserProfileUsecase()
  const {user} = await getuserProfile.exec({userId: req.user.sub})
  
  reply.status(200).send({
    user: {
      ...user,
      password_hash:null
    }

  })
}
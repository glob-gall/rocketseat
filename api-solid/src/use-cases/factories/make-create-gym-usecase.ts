import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository"
import { CreateGymUseCase } from "../create-gym.usecase"

export function makeCreateGymUsecase() {
  const gymRepo = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase( gymRepo)

  return useCase
}
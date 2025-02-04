import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository"
import { SearchGymUsecase } from "../search-gyms.usecase"

export function makeSearchGymUsecase() {
  const gymRepo = new PrismaGymsRepository()
  const useCase = new SearchGymUsecase( gymRepo)

  return useCase
}
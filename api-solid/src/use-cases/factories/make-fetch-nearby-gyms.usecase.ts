import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository"
import { FetchNearbyGymsUsecase } from "../fetch-nearby-gyms.usecase"

export function makeFetchNearbyGymsUsecase() {
  const gymRepo = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUsecase( gymRepo)

  return useCase
}
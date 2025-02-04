import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository"
import { CheckinUseCase } from "../check-in.usecase"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma-check-in.repository"

export function makeCheckinUsecase() {
  const checkinRepo = new PrismaCheckinRepository()
  const gymRepo = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(checkinRepo, gymRepo)

  return useCase
}
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma-check-in.repository"
import { FetchUserCheckinHistoryUseCase } from "../fetch-user-checkin-history.usecase"

export function makeFetchUserCheckinHistoryUseCase() {
  const checkinRepo = new PrismaCheckinRepository()
  const useCase = new FetchUserCheckinHistoryUseCase(checkinRepo)

  return useCase
}
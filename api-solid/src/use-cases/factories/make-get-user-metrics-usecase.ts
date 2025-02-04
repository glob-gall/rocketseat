import { GetUserMetricsUsecase } from "../get-user-metrics.usecase"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma-check-in.repository"

export function makeGetUserMetricsUsecase() {
  const checkinUserRepo = new PrismaCheckinRepository()
  const useCase = new GetUserMetricsUsecase(checkinUserRepo)

  return useCase
}
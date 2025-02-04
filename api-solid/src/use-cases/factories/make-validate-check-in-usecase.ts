import { ValidateCheckinUseCase } from "../validate-check-in.usecase"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma-check-in.repository"

export function makeValidateCheckinUseCase() {
  const checkinRepo = new PrismaCheckinRepository()
  const useCase = new ValidateCheckinUseCase(checkinRepo)

  return useCase
}
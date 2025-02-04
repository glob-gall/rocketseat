import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository"
import { AuthenticateUseCase } from "../authenticate.usecase"

export function makeAuthenticateUsecase() {
  const prismaUserRepo = new PrismaUsersRepository()
  const authenticateUsecase = new AuthenticateUseCase(prismaUserRepo)

  return authenticateUsecase
}
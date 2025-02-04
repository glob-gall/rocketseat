import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository"
import { RegisterUseCase } from "../register.usecase"

export function makeRegisterUsecase() {
  const prismaUserRepo = new PrismaUsersRepository()
  const registerUsecase = new RegisterUseCase(prismaUserRepo)

  return registerUsecase
}
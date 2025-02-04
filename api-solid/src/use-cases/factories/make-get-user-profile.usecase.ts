import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository"
import { GetUserProfileUseCase } from "../get-user-profile.usecase"

export function makeGetUserProfileUsecase() {
  const prismaUserRepo = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUserRepo)

  return useCase
}
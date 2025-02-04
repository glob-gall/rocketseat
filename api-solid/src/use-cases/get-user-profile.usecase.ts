import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async exec({userId}:GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
    const user = await this.userRepository.findById(userId)
    
    if (!user) throw new ResourceNotFoundError()
    
    return {user}
  }
}
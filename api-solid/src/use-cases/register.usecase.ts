import { UserRepository } from "@/repositories/user-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { User } from "@prisma/client"

interface registerUsecaseDto {
  name: string,
  email: string,
  password: string,
}

interface RegisterUsecaseResponse {
  user: User
}

export class RegisterUseCase {

  constructor(private userRepository: UserRepository) {}

  async exec({email,name,password}: registerUsecaseDto): Promise<RegisterUsecaseResponse>{
    const password_hash = await hash(password, 6)
    
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
    // const prismaUserRespository = new PrismaUsersRepository()
    
    const user = await this.userRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user
    }
  }
}

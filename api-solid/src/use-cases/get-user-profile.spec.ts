import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile.usecase";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";

describe('Get user profile use case', () => {
  let userRepository:InMemoryUsersRepository
  let getUserProfileUsecase: GetUserProfileUseCase

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileUsecase = new GetUserProfileUseCase(userRepository)
  })

  it('shold get user profile by id', async () => {
    const createdUser = await userRepository.create({
      email:'jhon@doe.com',
      name:"jhon doe",
      password_hash:'123456'
    })
    
    const { user } = await getUserProfileUsecase.exec({userId:createdUser.id})
    
    expect(user.id).toBe(createdUser.id)
    expect(user.name).toBe("jhon doe")
  })
})
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate.usecase";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

let userRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate use case', () => {

  beforeEach(()=> {
    userRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(userRepository)
  })

  it('shold be able to authenticate', async ()=> {
  

    await userRepository.create({
      name: 'jhon',
      email: 'jhon@doe.com',
      password_hash: await hash('123456', 6)
    })

    const {user} = await authenticateUseCase.exec({
      email: 'jhon@doe.com',
      password:'123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shold not be able to authenticate with wrong email', async ()=> {

    await userRepository.create({
      name: 'jhon',
      email: 'jhon@doe.com',
      password_hash: await hash('123456', 6)
    })

    expect(async () => await authenticateUseCase.exec({
      email: 'wrong@email.com',
      password:'123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shold not be able to authenticate with wrong password', async ()=> {

    await userRepository.create({
      name: 'jhon',
      email: 'jhon@doe.com',
      password_hash: await hash('123456', 6)
    })

    expect(async () => await authenticateUseCase.exec({
      email: 'jhon@doe.com',
      password:'wrong-password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
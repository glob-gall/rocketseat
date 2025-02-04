import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import {beforeEach, describe, expect, it, test} from 'vitest' 
import { RegisterUseCase } from './register.usecase'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let userRepository:InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register use case', () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(userRepository)
  })

  it('shold be able to register', async () => {

    const registerData = {
      name:'jhon doe',
      email: 'jhon@mail.com',
      password:'123454'
    }
    const {user} = await registerUseCase.exec(registerData)

    expect(user.id).toEqual(expect.any(String))
  })

  it('shold hash user password upon registration', async () => {

    const registerData = {
      name:'jhon doe',
      email: 'jhon@mail.com',
      password:'123454'
    }
    const {user} = await registerUseCase.exec(registerData)

    const isPasswordHashed = await compare(registerData.password, user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })

  it('shold not allow to create a user with same email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const email = 'jhon@mail.com'
    await registerUseCase.exec({
      name:'jhon doe',
      email,
      password:'123454'
    })

    await expect(() => registerUseCase.exec({
      name:'jhon 2',
      email,
      password:'123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
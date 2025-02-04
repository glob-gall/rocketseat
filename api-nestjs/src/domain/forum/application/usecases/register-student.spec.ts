import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterStudentUsecase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let studentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUsecase

describe('Register Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUsecase(studentsRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      email: 'student@email.com',
      name: 'student',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: studentsRepository.items[0],
    })
  })

  it('should be able to hash the student password', async () => {
    await sut.execute({
      email: 'student@email.com',
      name: 'student',
      password: '123456',
    })
    const hashedPassword = await fakeHasher.hash('123456')
    expect(studentsRepository.items[0].password).toEqual(hashedPassword)
  })
})

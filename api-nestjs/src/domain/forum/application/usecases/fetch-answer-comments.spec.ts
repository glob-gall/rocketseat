import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUsecase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let studentsRepository: InMemoryStudentsRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUsecase

describe('Fetch answer comments Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()

    answerCommentsRepository = new InMemoryAnswerCommentsRepository(
      studentsRepository,
    )
    sut = new FetchAnswerCommentsUsecase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student1 = makeStudent({
      name: 'author-1',
    })
    const student2 = makeStudent({
      name: 'author-2',
    })
    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student1.id,
    })
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student2.id,
    })
    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-2'),
      authorId: student1.id,
    })

    await answerCommentsRepository.create(comment1)
    await answerCommentsRepository.create(comment2)
    await answerCommentsRepository.create(comment3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(2)
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        answerId: new UniqueEntityID('answer-1'),
        authorId: student1.id,
      }),
      expect.objectContaining({
        answerId: new UniqueEntityID('answer-1'),
        authorId: student2.id,
      }),
    ])
  })

  it('should be able to fetch paginated answer answers correctly', async () => {
    const student = makeStudent({
      name: 'author-1',
    })

    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          createdAt: new Date(2025, 0, i),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)

    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
    ])
  })
})

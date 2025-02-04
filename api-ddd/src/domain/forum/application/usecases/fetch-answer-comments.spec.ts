import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUsecase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUsecase

describe('Fetch answer comments Use Case', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUsecase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-2'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(2)
    expect(result.value?.answerComments).toEqual([
      expect.objectContaining({
        answerId: new UniqueEntityID('answer-1'),
      }),
      expect.objectContaining({
        answerId: new UniqueEntityID('answer-1'),
      }),
    ])
  })

  it('should be able to fetch paginated answer answers correctly', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          createdAt: new Date(2025, 0, i),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)

    expect(result.value?.answerComments).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
    ])
  })
})

import { FetchQuestionAnswersUsecase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: InMemoryAnswersRepository
let answeAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchQuestionAnswersUsecase

describe('Fetch question answers Use Case', () => {
  beforeEach(() => {
    answeAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()

    answersRepository = new InMemoryAnswersRepository(
      answeAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUsecase(answersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-2'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(2)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        questionId: new UniqueEntityID('question-1'),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityID('question-1'),
      }),
    ])
  })

  it('should be able to fetch paginated question answers correctly', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
          createdAt: new Date(2025, 0, i),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)

    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
    ])
  })
})

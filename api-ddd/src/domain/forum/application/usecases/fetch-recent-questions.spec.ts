import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUsecase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: FetchRecentQuestionsUsecase

describe('Fetch recent questions Use Case', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new FetchRecentQuestionsUsecase(questionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 1) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 1) }),
    )
    await questionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 1) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
      expect.objectContaining({
        createdAt: new Date(2024, 0, 1),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 1),
      }),
    ])
  })

  it('should be able to fetch recent questions paginated correctly', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepository.create(
        makeQuestion({ createdAt: new Date(2025, 0, i) }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
    ])
  })
})

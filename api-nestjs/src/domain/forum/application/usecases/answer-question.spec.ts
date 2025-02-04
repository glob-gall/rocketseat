import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUsecase } from './answer-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answerRepository: InMemoryAnswersRepository
let answeAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: AnswerQuestionUsecase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    answeAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(answeAttachmentsRepository)
    sut = new AnswerQuestionUsecase(answerRepository)
  })

  it('should be able to create a answer', async () => {
    const result = await sut.execute({
      content: 'resposta',
      authorId: '1',
      questionId: '1',
      attachmentsIds: ['1', '2'],
    })
    expect(result.isRight()).toBe(true)
    expect(answerRepository.items[0]).toEqual(result.value?.answer)
    expect(answerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(answerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should be able to persist the attachments when creating a new answer', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'content',
      questionId: '1',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(answeAttachmentsRepository.items).toHaveLength(2)
    expect(answeAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})

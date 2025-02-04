import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUsecase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answerRepository: InMemoryAnswersRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let answeAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let questionRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUsecase

describe('Choose question best answer Use Case', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    answeAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(answeAttachmentsRepository)
    sut = new ChooseQuestionBestAnswerUsecase(
      questionRepository,
      answerRepository,
    )
  })

  it('should be able to choose question best  answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-01'),
    })
    const answer = makeAnswer({
      questionId: question.id,
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)
    await sut.execute({ authorId: 'author-01', answerId: answer.id.toString() })

    expect(questionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to change best answer from another author questions', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-01'),
    })
    const answer = makeAnswer({
      questionId: question.id,
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)
    await sut.execute({ authorId: 'author-01', answerId: answer.id.toString() })

    const result = await sut.execute({
      authorId: 'author-02',
      answerId: answer.id.toString(),
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

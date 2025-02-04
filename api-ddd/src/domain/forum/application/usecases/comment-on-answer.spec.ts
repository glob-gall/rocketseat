import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUsecase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answerRepository: InMemoryAnswersRepository
let answeAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUsecase

describe('Comment on Answer Use Case', () => {
  beforeEach(() => {
    answeAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(answeAttachmentsRepository)
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUsecase(answerRepository, answerCommentsRepository)
  })

  it('should be able to comment a answer', async () => {
    const answer = makeAnswer()
    await answerRepository.create(answer)

    const result = await sut.execute({
      authorId: answer.authorId.toString(),
      content: 'content',
      answerId: answer.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(answerCommentsRepository.items[0].content).toEqual('content')
  })
})

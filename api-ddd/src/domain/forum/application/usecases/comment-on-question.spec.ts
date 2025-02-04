import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUsecase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CommentOnQuestionUsecase

describe('Comment on Question Use Case', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUsecase(
      questionRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to comment a question', async () => {
    const question = makeQuestion()
    await questionRepository.create(question)

    const result = await sut.execute({
      authorId: question.authorId.toString(),
      content: 'content',
      questionId: question.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(questionCommentsRepository.items[0].content).toEqual('content')
  })
})

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUsecase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let questionRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let studentRepository: InMemoryStudentsRepository
let sut: CommentOnQuestionUsecase

describe('Comment on Question Use Case', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    studentRepository = new InMemoryStudentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
      attachmentsRepository,
      studentRepository,
    )
    questionCommentsRepository = new InMemoryQuestionCommentsRepository(
      studentRepository,
    )
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

import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/questions.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface DeleteQuestionUsecaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUsecaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteQuestionUsecase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUsecaseRequest): Promise<DeleteQuestionUsecaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    await this.questionsRepository.delete(question)
    return right({})
  }
}

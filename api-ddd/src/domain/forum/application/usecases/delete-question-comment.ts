import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface DeleteQuestionCommentUsecaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUsecaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  object
>

export class DeleteQuestionCommentUsecase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUsecaseRequest): Promise<DeleteQuestionCommentUsecaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }
    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}

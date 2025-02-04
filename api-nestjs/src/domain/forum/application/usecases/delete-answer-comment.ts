import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswerCommentUsecaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUsecaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerCommentUsecase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUsecaseRequest): Promise<DeleteAnswerCommentUsecaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }
    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)
    return right(null)
  }
}

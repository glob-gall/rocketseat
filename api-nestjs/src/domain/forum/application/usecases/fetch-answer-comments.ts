import { Either, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '@/core/entities/value-objetcs/comment-with-author'

interface FetchAnswerCommentsUsecaseRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsUsecaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUsecase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUsecaseRequest): Promise<FetchAnswerCommentsUsecaseResponse> {
    const comments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({ comments })
  }
}

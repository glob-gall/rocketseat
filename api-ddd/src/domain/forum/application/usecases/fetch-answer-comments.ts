import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'

interface FetchAnswerCommentsUsecaseRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsUsecaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUsecase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUsecaseRequest): Promise<FetchAnswerCommentsUsecaseResponse> {
    const answerComments = await this.answerCommentsRepository.findByAnswerId(
      answerId,
      {
        page,
      },
    )

    return right({ answerComments })
  }
}

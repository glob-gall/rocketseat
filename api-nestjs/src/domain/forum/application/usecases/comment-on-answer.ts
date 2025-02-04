import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers.repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { Injectable } from '@nestjs/common'

interface CommentOnAnswerUsecaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUsecaseResponse = Either<
  NotAllowedError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUsecase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUsecaseRequest): Promise<CommentOnAnswerUsecaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return left(new NotAllowedError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}

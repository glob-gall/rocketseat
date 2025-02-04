import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers.repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswerUsecaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUsecaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>
@Injectable()
export class DeleteAnswerUsecase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUsecaseRequest): Promise<DeleteAnswerUsecaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)
    return right(null)
  }
}

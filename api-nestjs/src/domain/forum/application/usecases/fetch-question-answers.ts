import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswersUsecaseRequest {
  page: number
  questionId: string
}

type FetchQuestionAnswersUsecaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>
@Injectable()
export class FetchQuestionAnswersUsecase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUsecaseRequest): Promise<FetchQuestionAnswersUsecaseResponse> {
    const answers = await this.answersRepository.findByQuestionId(questionId, {
      page,
    })

    return right({ answers })
  }
}

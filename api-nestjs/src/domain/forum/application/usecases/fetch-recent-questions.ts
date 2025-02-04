import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions.repository'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionsUsecaseRequest {
  page: number
}

type FetchRecentQuestionsUsecaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUsecase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUsecaseRequest): Promise<FetchRecentQuestionsUsecaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}

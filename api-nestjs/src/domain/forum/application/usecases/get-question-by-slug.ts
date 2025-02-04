import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/questions.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'

interface GetQuestionBySlugUsecaseRequest {
  slug: string
}

type GetQuestionBySlugUsecaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails
  }
>

@Injectable()
export class GetQuestionBySlugUsecase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUsecaseRequest): Promise<GetQuestionBySlugUsecaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    return right({ question })
  }
}

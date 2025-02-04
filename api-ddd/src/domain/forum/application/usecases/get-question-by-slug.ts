import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'

interface GetQuestionBySlugUsecaseRequest {
  slug: string
}

type GetQuestionBySlugUsecaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUsecase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUsecaseRequest): Promise<GetQuestionBySlugUsecaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    return right({ question })
  }
}

import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'

interface FetchQuestionCommentsUsecaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUsecaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUsecase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUsecaseRequest): Promise<FetchQuestionCommentsUsecaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}

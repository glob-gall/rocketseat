import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '@/core/entities/value-objetcs/comment-with-author'

interface FetchQuestionCommentsUsecaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUsecaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsUsecase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUsecaseRequest): Promise<FetchQuestionCommentsUsecaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({ comments })
  }
}

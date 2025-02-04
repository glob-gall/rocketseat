import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/questions.repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'

interface CommentOnQuestionUsecaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUsecaseResponse = Either<
  ResourceNotFoundError,
  { questionComment: QuestionComment }
>

@Injectable()
export class CommentOnQuestionUsecase {
  constructor(
    private questionsRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUsecaseRequest): Promise<CommentOnQuestionUsecaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}

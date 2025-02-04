import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers.repository'
import { QuestionRepository } from '../repositories/questions.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { Injectable } from '@nestjs/common'

interface ChooseQuestionBestAnswerUsecaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUsecaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class ChooseQuestionBestAnswerUsecase {
  constructor(
    private questionsRepository: QuestionRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUsecaseRequest): Promise<ChooseQuestionBestAnswerUsecaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)
    return right({ question })
  }
}

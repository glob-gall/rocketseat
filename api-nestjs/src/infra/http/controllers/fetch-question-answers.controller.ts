import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchQuestionAnswersUsecase } from '@/domain/forum/application/usecases/fetch-question-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const fetchQuestionAnswersBodySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchQuestionAnswersBodySchema = z.infer<
  typeof fetchQuestionAnswersBodySchema
>
const fetchQuestionAnswersValidationPipe = new ZodValidationPipe(
  fetchQuestionAnswersBodySchema,
)
@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(
    private readonly fetchQuestionAnswers: FetchQuestionAnswersUsecase,
  ) {}

  @Get()
  @HttpCode(201)
  async handle(
    @Query(fetchQuestionAnswersValidationPipe)
    { page }: FetchQuestionAnswersBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const answers = result.value.answers.map(AnswerPresenter.toHTTP)
    return { answers }
  }
}

import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRecentQuestionsUsecase } from '@/domain/forum/application/usecases/fetch-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

const fetchRecentQuestionsBodySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchRecentQuestionsBodySchema = z.infer<
  typeof fetchRecentQuestionsBodySchema
>
const fetchRecentQuestionsValidationPipe = new ZodValidationPipe(
  fetchRecentQuestionsBodySchema,
)
@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(
    private readonly fetchRecentQuestions: FetchRecentQuestionsUsecase,
  ) {}

  @Get()
  @HttpCode(201)
  async handle(
    @Query(fetchRecentQuestionsValidationPipe)
    { page }: FetchRecentQuestionsBodySchema,
  ) {
    console.log({ page })

    const result = await this.fetchRecentQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const questions = result.value.questions.map(QuestionPresenter.toHTTP)
    return { questions }
  }
}

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
import { FetchQuestionCommentsUsecase } from '@/domain/forum/application/usecases/fetch-question-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const fetchQuestionCommentsBodySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchQuestionCommentsBodySchema = z.infer<
  typeof fetchQuestionCommentsBodySchema
>
const fetchQuestionCommentsValidationPipe = new ZodValidationPipe(
  fetchQuestionCommentsBodySchema,
)
@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(
    private readonly fetchQuestionComments: FetchQuestionCommentsUsecase,
  ) {}

  @Get()
  @HttpCode(201)
  async handle(
    @Query(fetchQuestionCommentsValidationPipe)
    { page }: FetchQuestionCommentsBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const comments = result.value.comments.map(
      CommentWithAuthorPresenter.toHTTP,
    )
    return { comments }
  }
}

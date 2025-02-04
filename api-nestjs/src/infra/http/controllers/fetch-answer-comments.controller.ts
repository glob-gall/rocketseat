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
import { FetchAnswerCommentsUsecase } from '@/domain/forum/application/usecases/fetch-answer-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const fetchAnswerCommentsBodySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type FetchAnswerCommentsBodySchema = z.infer<
  typeof fetchAnswerCommentsBodySchema
>
const fetchAnswerCommentsValidationPipe = new ZodValidationPipe(
  fetchAnswerCommentsBodySchema,
)
@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(
    private readonly fetchAnswerComments: FetchAnswerCommentsUsecase,
  ) {}

  @Get()
  @HttpCode(201)
  async handle(
    @Query(fetchAnswerCommentsValidationPipe)
    { page }: FetchAnswerCommentsBodySchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
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

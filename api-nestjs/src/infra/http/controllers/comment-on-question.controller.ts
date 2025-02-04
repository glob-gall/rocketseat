import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { CommentOnQuestionUsecase } from '@/domain/forum/application/usecases/comment-on-question'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

const commentOnQuestionValidationPipe = new ZodValidationPipe(
  commentOnQuestionBodySchema,
)
@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private readonly commentOnQuestion: CommentOnQuestionUsecase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(commentOnQuestionValidationPipe)
    { content }: CommentOnQuestionBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: user.sub,
    })
    console.log({ result })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

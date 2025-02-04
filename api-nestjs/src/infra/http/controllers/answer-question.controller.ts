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
import { AnswerQuestionUsecase } from '@/domain/forum/application/usecases/answer-question'

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

const answerQuestionValidationPipe = new ZodValidationPipe(
  answerQuestionBodySchema,
)
@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private readonly answerQuestion: AnswerQuestionUsecase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(answerQuestionValidationPipe)
    { content, attachments }: AnswerQuestionBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: user.sub,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

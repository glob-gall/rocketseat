import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { EditQuestionUsecase } from '@/domain/forum/application/usecases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

const editquestionValidationPipe = new ZodValidationPipe(editQuestionBodySchema)
@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private readonly editQuestion: EditQuestionUsecase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(editquestionValidationPipe)
    { content, title, attachments }: EditQuestionBodySchema,
    @Param('id') questionId: string,
  ) {
    const result = await this.editQuestion.execute({
      questionId,
      authorId: user.sub,
      content,
      title,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

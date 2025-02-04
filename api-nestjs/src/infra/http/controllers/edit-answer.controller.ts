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
import { EditAnswerUsecase } from '@/domain/forum/application/usecases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const editanswerValidationPipe = new ZodValidationPipe(editAnswerBodySchema)
@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private readonly editAnswer: EditAnswerUsecase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(editanswerValidationPipe)
    { content }: EditAnswerBodySchema,
    @Param('id') answerId: string,
  ) {
    const result = await this.editAnswer.execute({
      answerId,
      content,
      authorId: user.sub,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

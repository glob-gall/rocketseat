import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { DeleteAnswerUsecase } from '@/domain/forum/application/usecases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private readonly deleteAnswer: DeleteAnswerUsecase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('id') answerId: string,
  ) {
    const result = await this.deleteAnswer.execute({
      authorId: user.sub,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

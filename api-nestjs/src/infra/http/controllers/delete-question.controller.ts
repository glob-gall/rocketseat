import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { DeleteQuestionUsecase } from '@/domain/forum/application/usecases/delete-question'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private readonly deleteQuestion: DeleteQuestionUsecase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('id') questionId: string,
  ) {
    const result = await this.deleteQuestion.execute({
      authorId: user.sub,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

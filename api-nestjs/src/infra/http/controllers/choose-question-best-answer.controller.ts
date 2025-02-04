import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ChooseQuestionBestAnswerUsecase } from '@/domain/forum/application/usecases/choose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private readonly chooseQuestionBestAnswer: ChooseQuestionBestAnswerUsecase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.chooseQuestionBestAnswer.execute({
      answerId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

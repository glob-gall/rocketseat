import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { DeleteAnswerCommentUsecase } from '@/domain/forum/application/usecases/delete-answer-comment'

@Controller('/answers/comments/:commentId/')
export class DeleteAnswerCommentController {
  constructor(
    private readonly deleteAnswerComment: DeleteAnswerCommentUsecase,
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('commentId') answerCommentId: string,
  ) {
    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

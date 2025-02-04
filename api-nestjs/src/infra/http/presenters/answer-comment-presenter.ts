import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class AnswerCommentPresenter {
  static toHTTP(Comment: AnswerComment) {
    return {
      id: Comment.id.toString(),
      content: Comment.content,
      createdAt: Comment.createdAt,
      updatedAt: Comment.updatedAt,
    }
  }
}

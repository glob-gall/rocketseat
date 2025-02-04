import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class QuestionCommentPresenter {
  static toHTTP(Comment: QuestionComment) {
    return {
      id: Comment.id.toString(),
      content: Comment.content,
      createdAt: Comment.createdAt,
      updatedAt: Comment.updatedAt,
    }
  }
}

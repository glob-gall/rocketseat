import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      author: questionDetails.author,
      content: questionDetails.content,
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
      title: questionDetails.title,
      slug: questionDetails.slug,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
    }
  }
}

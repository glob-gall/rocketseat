import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments.repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.filter((item) => !attachments.includes(item))
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const attachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )
    return attachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const attachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
    this.items = attachments
  }
}

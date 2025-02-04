import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments.repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const attachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )
    return attachments
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const attachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
    this.items = attachments
  }
}

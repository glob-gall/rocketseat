import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments.repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.filter((item) => !attachments.includes(item))
  }

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

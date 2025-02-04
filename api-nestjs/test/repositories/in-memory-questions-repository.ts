import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions.repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentRepository: InMemoryStudentsRepository,
  ) {}

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )
    this.items.splice(questionIndex, 1)

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    return question ?? null
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems(),
    )
    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(),
    )

    this.items[questionIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    return question ?? null
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) return null

    const author = this.studentRepository.items.find((student) =>
      student.id.equals(question.authorId),
    )
    if (!author)
      throw new Error(`Author ${question.authorId.toString()} not found`)

    const attachments = this.questionAttachmentsRepository.items.map(
      (questionAttachment) => {
        const attachment = this.attachmentsRepository.items.find((attachment) =>
          attachment.id.equals(questionAttachment.attachmentId),
        )
        if (!attachment)
          throw new Error(
            `Author ${questionAttachment.attachmentId.toString()} not found`,
          )
        return attachment
      },
    )

    return QuestionDetails.create({
      questionId: question.id,
      author: author.name,
      authorId: author.id,
      content: question.content,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      slug: question.slug,
      title: question.title,
      bestAnswerId: question.bestAnswerId,
      attachments,
    })
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const paginatedQuestions = questions.slice((page - 1) * 20, page * 20)

    return paginatedQuestions
  }
}

import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments.repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface EditAnswerUsecaseRequest {
  authorId: string
  answerId: string
  attachmentsIds: string[]
  content: string
}

type EditAnswerUsecaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer: Answer
  }
>
@Injectable()
export class EditAnswerUsecase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    content,
    answerId,
    authorId,
    attachmentsIds,
  }: EditAnswerUsecaseRequest): Promise<EditAnswerUsecaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    const currentQuestionsAttachments =
      await this.answersAttachmentsRepository.findManyByAnswerId(answerId)

    const answersAttachmentsList = new AnswerAttachmentList(
      currentQuestionsAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({
        answerId: new UniqueEntityID(answerId),
        attachmentId: new UniqueEntityID(attachmentId),
      }),
    )
    answersAttachmentsList.update(questionAttachments)

    answer.content = content
    answer.attachments = answersAttachmentsList

    await this.answersRepository.save(answer)
    return right({ answer })
  }
}

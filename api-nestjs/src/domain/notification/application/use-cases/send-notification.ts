import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationRepository } from '../repositories/notifications.repository'

export interface SendNotificationUsecaseRequest {
  recipientId: string
  content: string
  title: string
}

export type SendNotificationUsecaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUsecase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    content,
    recipientId,
    title,
  }: SendNotificationUsecaseRequest): Promise<SendNotificationUsecaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title,
    })

    this.notificationsRepository.create(notification)

    return right({ notification })
  }
}

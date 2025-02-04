import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationRepository } from '../repositories/notifications.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

interface ReadNotificationUsecaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUsecaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUsecase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUsecaseRequest): Promise<ReadNotificationUsecaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      return left(new ResourceNotFoundError())
    }
    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()
    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}

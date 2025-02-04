import { Notification } from '../../enterprise/entities/notification'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
  findById(notificationId: string): Promise<Notification | null>
}

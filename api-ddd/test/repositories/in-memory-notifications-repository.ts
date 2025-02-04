import { NotificationRepository } from '@/domain/notification/application/repositories/notifications.repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )
    this.items[notificationIndex] = notification
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id.toString() === notificationId,
    )

    return notification ?? null
  }
}

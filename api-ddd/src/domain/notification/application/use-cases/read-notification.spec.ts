import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUsecase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error'

let notificationRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUsecase

describe('Read Notification Use Case', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUsecase(notificationRepository)
  })

  it('should be able to create a notification', async () => {
    const notification = makeNotification()
    await notificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(notificationRepository.items[0].createdAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a notification fro manother recipient', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })
    await notificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

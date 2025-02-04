import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUsecase } from './send-notification'

let notificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUsecase

describe('Send Notification Use Case', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUsecase(notificationRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'notification Content',
      title: 'notification title',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationRepository.items[0]).toEqual(result.value?.notification)
  })
})

import { UploadAndCreateAttachmentUsecase } from './upload-and-create-attachment'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InvalidAttachmentType } from './errors/invalid-attachment-type.error'

let sut: UploadAndCreateAttachmentUsecase
let fakeUploader: FakeUploader
let attachmentsRepository: InMemoryAttachmentsRepository

describe('Upload And Create Attachment Use Case', () => {
  beforeEach(() => {
    fakeUploader = new FakeUploader()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    sut = new UploadAndCreateAttachmentUsecase(
      attachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: attachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload a file with the wrong file type', async () => {
    const result = await sut.execute({
      fileName: 'file.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentType)
  })
})

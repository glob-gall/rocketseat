// import { PaginationParams } from '@/core/repositories/pagination-params'
import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}

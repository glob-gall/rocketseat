import { Uploader } from '@/domain/forum/application/storage/uploader'
import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { EnvService } from '../env/env.service'

@Module({
  imports: [EnvService],
  providers: [{ provide: Uploader, useClass: R2Storage }],
  exports: [Uploader],
})
export class StorageModule {}

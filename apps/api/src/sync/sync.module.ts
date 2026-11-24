import { Module } from '@nestjs/common'
import { SyncController } from './sync.controller'
import { SubmissionsModule } from '../submissions/submissions.module'

@Module({
  imports: [SubmissionsModule],
  controllers: [SyncController],
})
export class SyncModule {}

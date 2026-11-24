import { Module } from '@nestjs/common'
import { ContentController } from './content.controller'
import { ManifestService } from './manifest.service'
import { ContentService } from './content.service'

@Module({
  controllers: [ContentController],
  providers: [ManifestService, ContentService],
  exports: [ContentService],
})
export class ContentModule {}

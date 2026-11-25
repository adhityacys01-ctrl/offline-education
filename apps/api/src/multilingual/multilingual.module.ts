import { Module } from '@nestjs/common'
import { MultilingualController } from './multilingual.controller'
import { MultilingualService } from './multilingual.service'
import { TranslationService } from './translation.service'
import { TokenProtectionService } from './token-protection.service'
import { AudioService } from './audio.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [MultilingualController],
  providers: [MultilingualService, TranslationService, TokenProtectionService, AudioService],
  exports: [MultilingualService, TranslationService, TokenProtectionService, AudioService],
})
export class MultilingualModule {}

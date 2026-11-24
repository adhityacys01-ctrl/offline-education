import { Module } from '@nestjs/common'
import { TeacherController } from './teacher.controller'
import { SubmissionsModule } from '../submissions/submissions.module'

@Module({
  imports: [SubmissionsModule],
  controllers: [TeacherController],
})
export class TeacherModule {}

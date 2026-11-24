import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { CoursesModule } from './courses/courses.module'
import { ContentModule } from './content/content.module'
import { HealthModule } from './health/health.module'
import { SubmissionsModule } from './submissions/submissions.module'
import { SyncModule } from './sync/sync.module'
import { TeacherModule } from './teacher/teacher.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    CoursesModule,
    ContentModule,
    HealthModule,
    SubmissionsModule,
    SyncModule,
    TeacherModule,
  ],
})
export class AppModule {}

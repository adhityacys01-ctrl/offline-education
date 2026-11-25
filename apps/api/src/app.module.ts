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
import { AdminModule } from './admin/admin.module'
import { MultilingualModule } from './multilingual/multilingual.module'

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
    AdminModule,
    MultilingualModule,
  ],
})
export class AppModule {}

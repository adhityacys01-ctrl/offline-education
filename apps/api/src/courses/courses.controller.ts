import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../prisma/prisma.service'

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const courses = await this.prisma.course.findMany({
      include: {
        _count: { select: { lessons: true, quizVersions: true } }
      },
      orderBy: { createdAt: 'asc' }
    })

    return courses.map((c) => ({
      id:                   c.id,
      title:                c.title,
      subject:              c.subject,
      description:          c.description,
      coverImageUrl:        c.coverImageUrl,
      lessonCount:          c._count.lessons,
      quizCount:            c._count.quizVersions,
      offlinePackageSizeMb: c.offlinePackageSizeMb,
    }))
  }

  @Get('meta/quizzes')
  async getAllQuizzes() {
    const courses = await this.prisma.course.findMany({
      include: {
        quizVersions: {
          where: { isRevoked: false },
          include: {
            questions: {
              include: { options: true }
            }
          }
        }
      }
    })

    const list: any[] = []
    for (const c of courses) {
      for (const q of (c as any).quizVersions || []) {
        list.push({
          quizVersionId: q.id,
          courseId: c.id,
          courseTitle: c.title,
          subject: c.subject,
          title: q.title,
          version: q.version,
          questionCount: q.questions?.length ?? 5,
          timeLimitMins: 15,
        })
      }
    }
    return list
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: true,
        quizVersions: {
          where: { isRevoked: false },
        }
      }
    })

    if (!course) throw new NotFoundException('Course not found')

    return {
      id:                   course.id,
      title:                course.title,
      subject:              course.subject,
      description:          course.description,
      coverImageUrl:        course.coverImageUrl,
      offlinePackageSizeMb: course.offlinePackageSizeMb,
      lessons:              (course as any).lessons || [],
      quizVersions:         (course as any).quizVersions || [],
    }
  }
}

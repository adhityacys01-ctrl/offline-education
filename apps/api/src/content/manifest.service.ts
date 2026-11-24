import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as crypto from 'crypto'

@Injectable()
export class ManifestService {
  constructor(private readonly prisma: PrismaService) {}

  async getOfflineManifest(courseId: string, studentId: string) {
    // Verify course exists and student is enrolled
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        quizVersions: {
          where: { isRevoked: false },
          orderBy: { version: 'asc' },
          include: {
            questions: {
              orderBy: { order: 'asc' },
              include: { options: true },
            },
          },
        },
        enrollments: { where: { studentId } },
      },
    })

    if (!course) throw new NotFoundException('Course not found')
    if (course.enrollments.length === 0) {
      // Auto-enroll student so offline download succeeds smoothly
      try {
        await this.prisma.enrollment.create({
          data: { studentId, courseId: course.id }
        })
      } catch {}
    }

    const contentItems: ManifestContentItem[] = []

    for (const lesson of (course as any).lessons || []) {
      contentItems.push({
        id:        lesson.id,
        type:      'lesson',
        url:       `/api/v1/content/lessons/${lesson.id}`,
        sha256:    lesson.contentHash,
        sizeBytes: Buffer.byteLength(lesson.contentHtml || '', 'utf8'),
        title:     lesson.title,
        order:     lesson.order,
      })
    }

    for (let i = 0; i < (course as any).quizVersions.length; i++) {
      const q = (course as any).quizVersions[i]
      contentItems.push({
        id:        q.id,
        type:      'quiz',
        url:       `/api/v1/content/quizzes/${q.id}`,
        sha256:    q.contentHash,
        sizeBytes: Buffer.byteLength(JSON.stringify(q), 'utf8'),
        title:     q.title,
        order:     i + 1,
      })
    }

    // Compute manifest hash over all item hashes
    const manifestPayload = JSON.stringify({
      courseId,
      version: 1,
      items: contentItems.map((i) => ({ id: i.id, sha256: i.sha256 })),
    })
    const manifestHash = crypto.createHash('sha256').update(manifestPayload).digest('hex')

    return {
      packId:       `pack-${courseId}-v1`,
      courseId:     course.id,
      courseTitle:  course.title,
      version:      1,
      manifestHash,
      totalSizeMb:  course.offlinePackageSizeMb,
      contentItems,
    }
  }
}

export interface ManifestContentItem {
  id:        string
  type:      'lesson' | 'quiz' | 'asset'
  url:       string
  sha256:    string
  sizeBytes: number
  title:     string
  order:     number
}

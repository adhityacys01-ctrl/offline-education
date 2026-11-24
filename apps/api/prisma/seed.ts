import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { COURSE_CATALOG } from '../src/prisma/course-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

  // ── Users ──────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 10)

  const student1 = await prisma.user.upsert({
    where:  { email: 'aarav@student.com' },
    update: {},
    create: { email: 'aarav@student.com',   name: 'Aarav Sharma',  passwordHash, role: 'student' },
  })
  const student2 = await prisma.user.upsert({
    where:  { email: 'diya@student.com' },
    update: {},
    create: { email: 'diya@student.com',    name: 'Diya Patel',    passwordHash, role: 'student' },
  })
  const teacher = await prisma.user.upsert({
    where:  { email: 'teacher@school.com' },
    update: {},
    create: { email: 'teacher@school.com',  name: 'Rohan Mehta',   passwordHash, role: 'teacher' },
  })
  const admin = await prisma.user.upsert({
    where:  { email: 'admin@school.com' },
    update: {},
    create: { email: 'admin@school.com',    name: 'Admin User',    passwordHash, role: 'admin' },
  })

  console.log(`✅ Users: ${student1.name}, ${student2.name}, ${teacher.name}, ${admin.name}`)

  // ── Courses, Lessons & Quizzes from COURSE_CATALOG ─────────────────────────
  for (const c of COURSE_CATALOG) {
    const course = await prisma.course.upsert({
      where:  { id: c.id },
      update: {
        title: c.title,
        subject: c.subject,
        description: c.description,
        offlinePackageSizeMb: c.offlinePackageSizeMb,
        isPublished: true,
      },
      create: {
        id: c.id,
        title: c.title,
        subject: c.subject,
        description: c.description,
        offlinePackageSizeMb: c.offlinePackageSizeMb,
        isPublished: true,
      },
    })

    // Enroll students in all courses
    for (const student of [student1, student2]) {
      await prisma.enrollment.upsert({
        where:  { studentId_courseId: { studentId: student.id, courseId: course.id } },
        update: {},
        create: { studentId: student.id, courseId: course.id },
      })
    }

    // 10 Lessons
    for (const ld of c.lessons) {
      await prisma.lesson.upsert({
        where:  { courseId_order: { courseId: course.id, order: ld.order } },
        update: {
          title: ld.title,
          contentHtml: ld.contentHtml,
          keyPoints: ld.keyPoints,
        },
        create: {
          id: `seed-lesson-${c.subject.toLowerCase().replace(/ /g, '-')}-${ld.order}`,
          courseId: course.id,
          title: ld.title,
          order: ld.order,
          contentHtml: ld.contentHtml,
          keyPoints: ld.keyPoints,
          contentHash: `sha256-lesson-${course.id}-${ld.order}`,
        },
      })
    }

    // 3 Quizzes
    for (let qIdx = 0; qIdx < c.quizzes.length; qIdx++) {
      const qSeed = c.quizzes[qIdx]
      const quizId = `seed-quiz-${c.subject.toLowerCase().replace(/ /g, '-')}-q${qIdx + 1}`

      const existingQuiz = await prisma.quizVersion.findUnique({ where: { id: quizId } })
      if (!existingQuiz) {
        await prisma.quizVersion.create({
          data: {
            id: quizId,
            courseId: course.id,
            title: qSeed.title,
            version: qSeed.version,
            contentHash: `sha256-quiz-${c.subject.toLowerCase().replace(/ /g, '-')}-q${qIdx + 1}-v${qSeed.version}`,
            questions: {
              create: qSeed.questions.map((quest) => {
                const optA = `opt-${quizId}-${quest.order}-0`
                const optB = `opt-${quizId}-${quest.order}-1`
                const optC = `opt-${quizId}-${quest.order}-2`
                const optD = `opt-${quizId}-${quest.order}-3`
                const optIds = [optA, optB, optC, optD]

                return {
                  order: quest.order,
                  prompt: quest.prompt,
                  correctOption: optIds[quest.correctIndex] || optA,
                  options: {
                    create: quest.options.map((opt, optIdx) => ({
                      id: optIds[optIdx],
                      label: opt.label,
                      text: opt.text,
                    })),
                  },
                }
              }),
            },
          },
        })
      }
    }

    console.log(`✅ Seeded ${c.title} (10 lessons, 3 quizzes)`)
  }

  console.log('\n🎉 Database seeding complete! 60 lessons, 18 quizzes seeded across 6 courses.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

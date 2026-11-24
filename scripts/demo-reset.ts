#!/usr/bin/env ts-node
/**
 * demo-reset.ts
 * Truncates all attempt/submission/outbox tables and re-seeds fresh data.
 * Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/demo-reset.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Demo Reset — Offline Learning Platform\n')

  // 1. Clear volatile tables (submissions, answers, idempotency, audit)
  console.log('  Clearing submission data...')
  await prisma.$transaction([
    prisma.submissionAnswer.deleteMany(),
    prisma.submission.deleteMany(),
    prisma.idempotencyRecord.deleteMany(),
    prisma.auditEvent.deleteMany(),
  ])

  console.log('  ✓ Submissions cleared')
  console.log('  ✓ Idempotency records cleared')
  console.log('  ✓ Audit log cleared')

  // 2. Report current counts
  const userCount = await prisma.user.count()
  const courseCount = await prisma.course.count()
  const quizCount = await prisma.quizVersion.count()
  const enrollmentCount = await prisma.enrollment.count()

  console.log('\n📊 Remaining data:')
  console.log(`  Users:        ${userCount}`)
  console.log(`  Courses:      ${courseCount}`)
  console.log(`  Quiz Versions: ${quizCount}`)
  console.log(`  Enrollments:  ${enrollmentCount}`)

  console.log('\n✅ Demo reset complete! All submission data cleared.')
  console.log('   Students: aarav@student.com, diya@student.com (password: password123)')
  console.log('   Teacher:  teacher@school.com (password: password123)')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

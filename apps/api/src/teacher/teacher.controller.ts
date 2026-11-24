import {
  Controller,
  Get,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { SubmissionsService } from '../submissions/submissions.service'

interface AuthUser {
  id: string
  email: string
  role: string
}

@Controller('teacher')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  private assertTeacher(user: AuthUser) {
    if (user.role !== 'teacher') {
      throw new ForbiddenException('Teacher role required')
    }
  }

  /**
   * GET /teacher/submissions
   * Returns all submissions across all courses for the teacher dashboard
   */
  @Get('submissions')
  async getAllSubmissions(@CurrentUser() user: AuthUser) {
    this.assertTeacher(user)
    return this.submissionsService.getAllSubmissionsForTeacher()
  }

  /**
   * GET /teacher/courses/:courseId/submissions
   * Returns submissions for a specific course
   */
  @Get('courses/:courseId/submissions')
  async getSubmissionsForCourse(
    @CurrentUser() user: AuthUser,
    @Param('courseId') courseId: string,
  ) {
    this.assertTeacher(user)
    return this.submissionsService.getSubmissionsForTeacher(courseId)
  }

  /**
   * GET /teacher/submissions/:submissionId
   * Returns full detail for one submission including per-question answers
   */
  @Get('submissions/:submissionId')
  async getSubmissionDetail(
    @CurrentUser() user: AuthUser,
    @Param('submissionId') submissionId: string,
  ) {
    this.assertTeacher(user)
    return this.submissionsService.getSubmissionDetailForTeacher(submissionId)
  }
}

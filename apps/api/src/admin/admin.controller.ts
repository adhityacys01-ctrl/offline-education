import { Controller, Get, Patch, Post, Param, Body, UseGuards, Request } from '@nestjs/common'
import { AdminService } from './admin.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats(@Request() req: any) {
    return this.adminService.getStats(req.user.role)
  }

  @Get('users')
  getUsers(@Request() req: any) {
    return this.adminService.getUsers(req.user.role)
  }

  @Patch('users/:id/role')
  updateUserRole(
    @Request() req: any,
    @Param('id') userId: string,
    @Body('role') newRole: 'student' | 'teacher' | 'admin',
  ) {
    return this.adminService.updateUserRole(req.user.role, userId, newRole)
  }

  @Get('sync-monitor')
  getSyncMonitor(@Request() req: any) {
    return this.adminService.getSyncMonitor(req.user.role)
  }

  @Get('audit-logs')
  getAuditLogs(@Request() req: any) {
    return this.adminService.getAuditLogs(req.user.role)
  }

  @Get('conflict-policies')
  getConflictPolicies(@Request() req: any) {
    return this.adminService.getConflictPolicies(req.user.role)
  }

  @Post('courses/:id/publish')
  publishCourse(@Request() req: any, @Param('id') courseId: string) {
    return this.adminService.publishCourse(req.user.role, courseId)
  }
}

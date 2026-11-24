import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { CurrentUser, AuthUser } from './current-user.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in and receive JWT access token' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create new user account and receive JWT token' })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Post('register')
  @ApiOperation({ summary: 'Alias for signup' })
  async register(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  async profile(@CurrentUser() user: AuthUser) {
    return this.authService.getProfile(user.id)
  }
}

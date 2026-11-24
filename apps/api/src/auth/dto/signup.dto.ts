import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignupDto {
  @ApiProperty({ example: 'Diya Patel' })
  @IsString()
  @MinLength(2)
  name!: string

  @ApiProperty({ example: 'diya@student.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string

  @ApiProperty({ enum: ['student', 'teacher'] })
  @IsEnum(['student', 'teacher'])
  role!: 'student' | 'teacher'
}

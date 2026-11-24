import { IsString, IsArray, IsDateString, ValidateNested, IsOptional, IsInt } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class AnswerDto {
  @ApiProperty() @IsString()   questionId!: string
  @ApiProperty() @IsOptional() @IsString() selectedOptionId!: string | null
  @ApiProperty() @IsInt()      revision!: number
}

export class SubmitAttemptDto {
  @ApiProperty() @IsString()         clientAttemptId!: string
  @ApiProperty() @IsString()         quizVersionId!: string
  @ApiProperty() @IsString()         idempotencyKey!: string
  @ApiProperty() @IsString()         payloadHash!: string
  @ApiProperty({ type: [AnswerDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => AnswerDto)
  answers!: AnswerDto[]
  @ApiProperty() @IsDateString()     startedAt!: string
  @ApiProperty() @IsDateString()     finalizedAt!: string
}

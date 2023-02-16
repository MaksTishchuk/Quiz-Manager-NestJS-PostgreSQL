import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestionDto {

  @ApiProperty({
    description: 'The actual question',
    example: 'A sample question',
  })
  @IsNotEmpty()
  @Length(3)
  question: string

  @ApiProperty({
    description: 'The quiz id to which the question is associated.',
    example: 1,
  })
  @IsNotEmpty()
  quizId: number
}
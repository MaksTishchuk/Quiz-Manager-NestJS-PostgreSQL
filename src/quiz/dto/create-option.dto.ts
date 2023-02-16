import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOptionDto {

  @ApiProperty({
    description: 'The option for a question',
    example: 'Option 1',
  })
  @IsNotEmpty()
  text: string

  @ApiProperty({
    description: 'The ID of the question',
    example: 1,
  })
  @IsNotEmpty()
  questionId: number

  @ApiProperty({
    description: 'Is the option is correct?',
    example: true,
  })
  @IsNotEmpty()
  isCorrect: boolean
}
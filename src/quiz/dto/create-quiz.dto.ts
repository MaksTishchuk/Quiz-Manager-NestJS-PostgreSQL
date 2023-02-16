import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuizDto {

  @ApiProperty({
    description: 'The title of the quiz',
    example: 'How good are your with NodeJS?',
  })
  @IsNotEmpty({message: 'The quiz should have a title!'})
  @Length(3, 255)
  title: string

  @ApiProperty({
    description: 'A small description for the user',
    example:
      'This quiz will ask your questions on NodeJS and test your knowledge.',
  })
  @IsNotEmpty({message: 'The quiz should have a description!'})
  @Length(3)
  description: string
}
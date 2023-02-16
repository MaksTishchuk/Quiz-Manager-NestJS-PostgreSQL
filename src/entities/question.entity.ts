import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuizEntity} from "./quiz.entity";
import {OptionEntity} from "./option.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @ApiProperty({description: 'The primary ID of question.', example: 1})
  @PrimaryGeneratedColumn({comment: 'The question unique identifier'})
  id: number

  @ApiProperty({description: 'The actual question', example: 'What is the question?'})
  @Column({type: 'varchar'})
  question: string

  @ApiProperty({description: 'Quiz of the question'})
  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity

  @ApiProperty({description: 'Options of the question'})
  @OneToMany(() => OptionEntity, (option) => option.question)
  options: OptionEntity[]
}
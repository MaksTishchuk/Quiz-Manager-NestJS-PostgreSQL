import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('quizzes')
export class QuizEntity extends BaseEntity {

  @ApiProperty({ description: 'Primary key as Quiz ID', example: 1 })
  @PrimaryGeneratedColumn({comment: 'The quiz unique identifier'})
  id: number

  @ApiProperty({description: 'Title of the quiz', example: 'Sample Laravel quiz'})
  @Column({type: 'varchar'})
  title: string

  @ApiProperty({description: 'Description of the quiz', example: 'Lorem ipsum'})
  @Column({type: 'text'})
  description: string

  @ApiProperty({description: 'Quiz active or inactive state', example: true})
  @Column({type: 'boolean', default: 1})
  isActive: boolean

  @ApiProperty({description: 'List of questions'})
  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionEntity[]
}
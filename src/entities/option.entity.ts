import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('options')
export class OptionEntity extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Option ID', example: 1 })
  @PrimaryGeneratedColumn({comment: 'The option unique identifier'})
  id: number

  @ApiProperty({ description: 'The actual option', example: 'Option 1' })
  @Column({type: 'varchar'})
  text: string

  @ApiProperty({ description: 'Is option is correct?', example: true })
  @Column({type: 'boolean'})
  isCorrect: boolean

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  question: QuestionEntity
}
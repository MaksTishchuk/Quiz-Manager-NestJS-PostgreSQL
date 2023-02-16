import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoleEnum} from "./enum/user-role.enum";

@Entity('users')
export class UserEntity extends BaseEntity {

  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn({comment: 'The user unique identifier'})
  id: number

  @ApiProperty({ description: 'User name', example: 'Maks' })
  @Column()
  name: string

  @ApiProperty({
    description: 'User email address',
    example: 'maks@gmail.com',
  })
  @Column({unique: true})
  email: string

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string

  @ApiProperty({ description: 'User role' })
  @Column({type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.MEMBER})
  role: UserRoleEnum

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date

}
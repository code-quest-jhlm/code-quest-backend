import { Role } from '../../../common/constants'
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'user', schema: process.env.DB_SCHEMA })
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  userId: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role

  @DeleteDateColumn()
  deletedAt: Date
}

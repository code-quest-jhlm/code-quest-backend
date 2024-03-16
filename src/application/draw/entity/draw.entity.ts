import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DrawEnum } from '../enum/draw.enum'
import { Reward } from 'src/application/reward/entity/reward.entity'

@Entity({ name: 'draw', schema: process.env.DB_SCHEMA_DRAW_APPLICATION })
export default class Draw {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({
    length: 150,
    type: 'varchar',
    comment: 'Titulo del sorteo',
  })
  readonly title: string

  @Column({
    length: 350,
    type: 'varchar',
    comment: 'Descripción del sorteo',
  })
  readonly description: string

  @Column({
    name: 'creation_date',
    type: 'date',
  })
  readonly creationDate: Date

  @Column({
    name: 'draw_date',
    type: 'date',
  })
  readonly drawDate: Date

  @ManyToMany(() => Reward, (reward) => reward.draws)
  @JoinTable({
    name: 'draw_reward',
    joinColumn: {
      name: 'draw_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'reward_id',
      referencedColumnName: 'id',
    },
  })
  rewards: Reward[]

  @Column({
    name: 'state',
    type: 'enum',
    enum: DrawEnum,
    default: DrawEnum.ACTIVO,
  })
  readonly state: string

  @Column({
    name: 'id_server',
  })
  readonly idServer: string
}

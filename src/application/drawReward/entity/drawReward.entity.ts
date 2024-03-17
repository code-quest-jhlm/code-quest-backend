import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Reward } from '../../reward/entity/reward.entity'
import { Draw } from '../../draw/entity/draw.entity'

@Entity({ name: 'draw_reward', schema: process.env.DB_SCHEMA })
export class DrawReward {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw

  @ManyToOne(() => Reward, (rewardEntity) => rewardEntity.id)
  id_reward: Reward
}

import { Draw } from '../../draw/entity/draw.entity'
import { Reward } from '../../reward/entity/reward.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'winners' })
export default class Winner {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw

  @ManyToOne(() => Reward, (rewardEntity) => rewardEntity.id)
  id_reward: Reward
}

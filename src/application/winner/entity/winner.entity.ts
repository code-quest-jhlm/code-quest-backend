import { Draw } from '../../draw/entity/draw.entity'
import { Reward } from '../../reward/entity/reward.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'winners' })
export class Winner {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'bigint', comment: 'Id de discord del participante ganador' })
  id_discord: number

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw

  @ManyToOne(() => Reward, (rewardEntity) => rewardEntity.id)
  id_reward: Reward
}

import { Entity,   Column, PrimaryGeneratedColumn, ManyToOne,  JoinColumn, } from 'typeorm'
import { Reward } from '../../reward/entity/reward.entity'
import { Draw } from '../../draw/entity/draw.entity'

@Entity({ name: 'draw_reward', schema: process.env.DB_SCHEMA })
export class DrawReward {
  @PrimaryGeneratedColumn()
  id?: string

  @JoinColumn({name: 'id_draw',
  referencedColumnName: 'id',})
  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw

  @JoinColumn({name: 'id_reward',
  referencedColumnName: 'id',})
  @ManyToOne(() => Reward, (rewardEntity) => rewardEntity.id)
  id_reward: Reward

  @Column({
    name: 'id_reward',
  })
  idReward: string
  
  @Column({
    name: 'id_draw',
  })
  idDraw: string
  
 

}

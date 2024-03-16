import Draw from 'src/application/draw/entity/draw.entity'
import { Reward } from 'src/application/reward/entity/reward.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'winners', schema: process.env.DB_SCHEMA_DRAW_APPLICATION })
export default class Winner {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla ganadores',
  })
  id: string

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw

  @ManyToOne(() => Reward, (rewardEntity) => rewardEntity.id)
  id_reward: Reward
}

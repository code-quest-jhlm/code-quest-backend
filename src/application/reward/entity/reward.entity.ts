import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Draw } from '../../draw/entity/draw.entity'

@Entity({ name: 'rewards' })
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre del premio' })
  name: string

  @Column({ length: 255, type: 'varchar', comment: 'Descripción del premio' })
  description: string

  @ManyToMany(() => Draw, (draw) => draw.rewards)
  draws: Draw[]
}

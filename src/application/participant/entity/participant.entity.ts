/* eslint-disable prettier/prettier */
import { Draw } from '../../draw/entity/draw.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, type: 'varchar', comment: 'Nombre del participante' })
  full_name: string

  @Column({
    type: 'bigint',
  })
  id_discord: number

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.id)
  id_draw: Draw
}

import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Draw from 'src/application/draw/entity/draw.entity'

@Entity({ name: 'premios', schema: process.env.DB_SCHEMA_PARAMETRICAS })
export class Reward {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla premios',
  })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de parámetro' })
  nombre: string

  @Column({ length: 255, type: 'varchar', comment: 'Descripción de parámetro' })
  descripcion: string

  @ManyToMany(() => Draw, (draw) => draw.rewards)
  draws: Draw[]
}

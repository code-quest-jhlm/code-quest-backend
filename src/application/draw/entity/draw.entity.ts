import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm'
import { DrawEnum } from '../enum/draw.enum'
import { User } from '../../../core/user/entity/user.entity'

@Entity({ name: 'draw', schema: process.env.DB_SCHEMA })
export class Draw {
  @PrimaryGeneratedColumn(
    {
      type: 'bigint',
      name: 'id',
      comment: 'Clave primaria de la tabla Usuario',
    }
  )
  id: string

  @Column({
    length: 150,
    type: 'varchar',
    comment: 'Titulo del sorteo',
  })
  title: string

  @Column({
    length: 350,
    type: 'varchar',
    comment: 'Descripción del sorteo',
  })
  description: string

  @Column({
    name: 'creation_date',
    type: 'date',
    default: new Date(),
  })
  creationDate: Date

  @Column({
    name: 'draw_date',
    type: 'date',
  })
  drawDate: Date

  @Column({
    name: 'state',
    type: 'enum',
    enum: DrawEnum,
    default: DrawEnum.ACTIVO,
  })
  state: string

  @Column({
    name: 'id_user'
  })
  idUser: string
  
  @JoinColumn({name: 'id_user',
  referencedColumnName: 'id',})
  @ManyToOne(() => User, (userEntity) => userEntity.id)
  user: User

  
  @BeforeInsert()
  beforeInsert() {
    this.creationDate = new Date()
  }
}

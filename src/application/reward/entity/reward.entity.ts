import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'rewards' })
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre del premio' })
  name: string
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'rewards' })
export class Reward {
  @PrimaryGeneratedColumn()
  id?: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre del premio' })
  name: string
}

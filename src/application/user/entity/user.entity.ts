import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, type: 'varchar', comment: 'Nombre del usuario' })
  full_name: string

  @Column({ length: 255, type: 'varchar', comment: 'Id de usuario de discord' })
  id_discord: string
}

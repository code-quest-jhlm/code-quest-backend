import { Participant } from "src/participants/entities/participant.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('draw')
export class Draw {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    type: 'boolean',
  })
  state: boolean

  @Column({ nullable: true })
  totalWinners: number

  @Column('text', {
    array: true,
    nullable: true
  })
  awards: string[]

  @CreateDateColumn()
  drawDate: Date

  @OneToMany(() => Participant, (participantEntity) => participantEntity.draw, { eager: true })
  participants: Participant[]
}

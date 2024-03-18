import { Draw } from "../../draw/entities/draw.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('participant')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discordId: string

  @Column()
  name: string

  @Column()
  avatar: string

  @ManyToOne(() => Draw, (drawEntity) => drawEntity.participants)
  draw: Draw
}

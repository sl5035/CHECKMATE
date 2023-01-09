import { Ticket } from '../../tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // TODO: Fix the default value
  @Column({ default: true })
  admin: boolean;

  @OneToMany((type) => Ticket, (ticket) => ticket.owner, { eager: true })
  tickets: Ticket[];
}

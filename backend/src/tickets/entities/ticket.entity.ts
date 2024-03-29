import { User } from '../../users/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  openTime: string;

  @Column()
  lastEntry: string;

  @Column()
  @Exclude()
  url: string;

  @Column()
  price: number;

  // TODO: Original price??

  @Column({ default: false })
  sold: boolean;

  @ManyToOne(() => User, (user) => user.tickets, { eager: false })
  owner: User;
}

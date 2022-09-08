import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  // TODO: Delete??
  @IsNotEmpty()
  type: string;

  @Column()
  @IsString()
  // TODO: Delete??
  @IsNotEmpty()
  category: string;

  @Column()
  @IsDate()
  @IsNotEmpty()
  openTime: Date;

  @Column()
  @IsDate()
  @IsNotEmpty()
  lastEntry: Date;

  @Column()
  // TODO: IsString??
  @IsUrl()
  url: string;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne((type) => User, (user) => user.tickets)
  owner: User;
}

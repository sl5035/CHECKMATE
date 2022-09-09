import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  openTime: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  lastEntry: string;

  @Column()
  // TODO: IsString??
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ManyToOne((type) => User, (user) => user.tickets)
  owner: User;
}

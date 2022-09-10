import { Expose, Type } from 'class-transformer';
import { User } from '../../users/entities/User.entity';

export class TicketDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  type: string;

  @Expose()
  category: string;

  @Expose()
  openTime: string;

  @Expose()
  lastEntry: string;

  @Expose()
  price: number;

  @Expose()
  sold: boolean;

  @Expose()
  owner: User;
}

import { Expose } from 'class-transformer';
import { Ticket } from 'src/tickets/entities/ticket.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Expose()
  tickets: Ticket[];
}

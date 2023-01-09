import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateTicketDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

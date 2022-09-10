import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  openTime: string;

  @IsString()
  @IsOptional()
  lastEntry: string;

  @IsUrl()
  @IsOptional()
  url: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsBoolean()
  @IsOptional()
  sold: boolean;
}

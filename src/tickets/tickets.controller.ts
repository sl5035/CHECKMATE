import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseGuards(AuthGuard())
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  //   @Post()
  //   createTicket(@Query('URL') ticketUrl: string) {
  //     return this.ticketsService.create(ticketUrl);
  //   }

  @Post('/create')
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }
}

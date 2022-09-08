import { Controller, Post, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  createTicket(@Query('URL') ticketUrl: string) {
    return this.ticketsService.create(ticketUrl);
  }
}

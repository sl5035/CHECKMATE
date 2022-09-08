import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TicketsService } from './tickets.service';

@Controller('tickets')
// @UseGuards(AuthGuard())
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  createTicket(@Query('URL') ticketUrl: string) {
    return this.ticketsService.create(ticketUrl);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketDto } from './dtos/ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { SerializeTicket } from './interceptors/serialize-ticket.interceptor';
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
  @SerializeTicket(TicketDto)
  createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @SerializeTicket(TicketDto)
  findAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get('/:id')
  @SerializeTicket(TicketDto)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketsService.findOneById(id);
  }

  // TODO: Should we allow to patch ticket info? (Only patch price and url?)
  @Patch('/:id')
  updateTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketsService.remove(id);
  }
}

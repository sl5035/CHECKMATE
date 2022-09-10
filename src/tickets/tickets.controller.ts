import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplyUser } from '../guards/apply-user.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/User.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  //   @Post()
  //   createTicket(@Query('URL') ticketUrl: string) {
  //     return this.ticketsService.create(ticketUrl);
  //   }

  @Post('/create')
  @UseGuards(ApplyUser)
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: User,
  ): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto, user);
  }

  @Get()
  findAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get('/:id')
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

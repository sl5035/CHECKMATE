import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/User.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: signup (create) -> auth credentials
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Get()
  findByEmail(@Query('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}

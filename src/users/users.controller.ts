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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/User.entity';
import { SerializeUser } from './interceptors/serialize-user.interceptor';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  @SerializeUser(UserDto)
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get()
  @SerializeUser(UserDto)
  @UseGuards(AuthGuard())
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @SerializeUser(UserDto)
  @UseGuards(AuthGuard())
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Get()
  @SerializeUser(UserDto)
  @UseGuards(AuthGuard())
  findByEmail(@Query('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch('/:id')
  @SerializeUser(UserDto)
  @UseGuards(AuthGuard())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @SerializeUser(UserDto)
  @UseGuards(AuthGuard())
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}

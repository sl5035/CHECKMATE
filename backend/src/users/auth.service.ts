import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/User.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSerivce: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    // See if email is in use
    const existingUser = await this.usersSerivce.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('email in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserDto: CreateUserDto = {
      email,
      password: hashedPassword,
    };

    return this.usersSerivce.create(newUserDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersSerivce.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found.');
    }

    if (await bcrypt.compare(password, user.password)) {
      // Generating User Token
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login failed. Wrong password.');
    }
  }
}

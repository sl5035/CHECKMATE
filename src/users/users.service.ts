import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/User.entity';

// TODO: Error handling
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}

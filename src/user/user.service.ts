import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, GetUserResponse } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserByUserId(userId: string): Promise<User> {
    return await this.usersRepository.findOneBy({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOne(userId: string): Promise<GetUserResponse> {
    try {
      const user = await this.usersRepository.findOneBy({ userId });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      return {
        status: 'success',
        message: 'Login successful',
        data: user,
      };
    } catch (error) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Failed to fetch',
      });
    }
  }

  async remove(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}

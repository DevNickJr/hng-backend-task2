import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { password: userPassword, ...other } = createUserDto;
    const user = await this.usersService.findOne(other.email);

    if (user && user.email) {
      throw new BadRequestException('Email Already in use');
    }

    const password = await this.hashPassword(userPassword);
    return await this.usersService.create({ ...other, password });
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findOne(createAuthDto.email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    await this.comparePassword(user.password, createAuthDto.password);

    const payload = { userId: user.userId, email: user.email };



    const token = this.jwtService.sign(payload);

    return token;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }

  async comparePassword(password1: string, password2): Promise<string> {
    try {
      return await bcrypt.compare(password1, password2);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }
}

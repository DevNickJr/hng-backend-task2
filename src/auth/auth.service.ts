import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto, CreateUserResponse } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IToken } from './interface';
import { OrganisationService } from 'src/organisation/organisation.service';
import { UserOrganisationService } from 'src/shared/shared.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly organisationService: OrganisationService,
    private readonly userOrganisationService: UserOrganisationService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const { password: userPassword, ...other } = createUserDto;

      const password = await this.hashPassword(userPassword);

      const newUser = await this.usersService.create({ ...other, password });

      const organisation = await this.organisationService.create({
        name: `${newUser.firstName + "'s"} Organisation`,
      });

      // Create the StudentCourse entity instance with references to the saved Student and Course
      await this.userOrganisationService.create({
        user: newUser,
        organisation,
        isOwner: true,
      });

      const payload = { userId: newUser.userId, email: newUser.email };

      const token = this.createToken(payload);

      return {
        status: 'success',
        message: 'Registration successful',
        data: {
          accessToken: token,
          user: newUser,
        },
      };
    } catch (error) {
      throw new BadRequestException({
        status: 'Bad request',
        message: 'Registration unsuccessful',
      });
    }
  }

  async login(createAuthDto: CreateAuthDto): Promise<CreateUserResponse> {
    try {
      const user = await this.usersService.getUserByEmail(createAuthDto.email);

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      await this.comparePassword(user.password, createAuthDto.password);

      const payload = { userId: user.userId, email: user.email };

      const token = this.createToken(payload);

      return {
        status: 'success',
        message: 'Login successful',
        data: {
          accessToken: token,
          user: user,
        },
      };
    } catch (error) {
      throw new UnauthorizedException({
        status: 'Bad request',
        message: 'Authentication failed',
      });
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password1: string, password2): Promise<string> {
    return await bcrypt.compare(password1, password2);
  }

  createToken(payload: IToken): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}

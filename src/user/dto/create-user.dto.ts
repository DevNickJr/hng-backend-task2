import { IsEmail, IsString } from 'class-validator';
import { IUser } from '../interface';

export class CreateUserDto implements IUser {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;
}

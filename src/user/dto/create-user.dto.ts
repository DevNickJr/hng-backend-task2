import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUser } from '../interface';
import { GenericResponse } from 'src/auth/dto/create-auth.dto';

export class CreateUserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;
}

export class ReturnUserDto implements Omit<IUser, 'password'> {
  @IsString()
  userId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class GetUserResponse extends GenericResponse {
  data: ReturnUserDto;
}

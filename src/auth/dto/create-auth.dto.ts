import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ReturnUserDto } from 'src/user/dto/create-user.dto';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class GenericResponse {
  @IsDefined()
  @IsString()
  status: string;

  @IsDefined()
  @IsString()
  message?: string;
}

export class CreateUserResponse extends GenericResponse {
  data: {
    accessToken: string;
    user: ReturnUserDto;
  };
}

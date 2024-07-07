import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { GenericResponse } from 'src/auth/dto/create-auth.dto';
import { IUserOrganisation } from '../interface';
import { User } from 'src/user/entities/user.entity';
import { Organisation } from 'src/organisation/entities/organisation.entity';

export class CreateUserOrganisationDto implements IUserOrganisation {
  @IsString()
  @IsOptional()
  orgId?: string;

  @IsOptional()
  user: User;

  @IsOptional()
  organisation: Organisation;

  @IsString()
  userId?: string;

  @IsBoolean()
  isOwner?: boolean;
}

export class ReturnUserOrganisationDto implements IUserOrganisation {
  @IsString()
  orgId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  isOwner?: boolean;
}

export class GetUserOrganisationResponse extends GenericResponse {
  data: ReturnUserOrganisationDto;
}

export class GetUserOrganisationsResponse extends GenericResponse {
  data: ReturnUserOrganisationDto[];
}

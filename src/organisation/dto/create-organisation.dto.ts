import { IsOptional, IsString } from 'class-validator';
import { GenericResponse } from 'src/auth/dto/create-auth.dto';
import { IOrganisation } from '../interface';

export class CreateOrganisationDto implements IOrganisation {
  @IsString()
  @IsOptional()
  orgId?: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class AddUserToOrganisationDto {
  @IsString()
  userId: string;
}

export class ReturnOrganisationDto implements IOrganisation {
  @IsString()
  orgId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class GetOrganisationResponse extends GenericResponse {
  data: ReturnOrganisationDto;
}

export class GetOrganisationsResponse extends GenericResponse {
  data: {
    organisations: ReturnOrganisationDto[];
  };
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOrganisationDto } from './create-shared.dto';

export class UpdateSharedDto extends PartialType(CreateUserOrganisationDto) {}

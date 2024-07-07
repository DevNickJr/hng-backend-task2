import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import {
  AddUserToOrganisationDto,
  CreateOrganisationDto,
} from './dto/create-organisation.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  create(
    @Body() createOrganisationDto: CreateOrganisationDto,
    @CurrentUser() user: User,
  ) {
    return this.organisationService.userCreate(createOrganisationDto, user);
  }

  @Get()
  findAllUserOrganisations(@CurrentUser() user: User) {
    return this.organisationService.findAllUserOrganisations(user);
  }

  @Get(':orgId')
  findOne(@Param('orgId') orgId: string) {
    return this.organisationService.findOne(orgId);
  }

  @Post(':orgId/users')
  addToOrg(
    @Param('orgId') orgId: string,
    @Body() addUserToOrganisationDto: AddUserToOrganisationDto,
  ) {
    return this.organisationService.addUserToOrg(
      orgId,
      addUserToOrganisationDto,
    );
  }

  @Get('all')
  findAll() {
    return this.organisationService.findAll();
  }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrganisationDto: UpdateOrganisationDto,
  // ) {
  //   return this.organisationService.update(id, updateOrganisationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(id);
  }
}

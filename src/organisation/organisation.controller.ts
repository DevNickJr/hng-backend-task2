import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';

@Controller('api/organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationService.create(createOrganisationDto);
  }

  @Get()
  findAll() {
    return this.organisationService.findAll();
  }

  @Get(':orgId')
  findOne(@Param('orgId') orgId: string) {
    return this.organisationService.findOne(orgId);
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

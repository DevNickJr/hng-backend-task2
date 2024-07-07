import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserOrganisationService } from './shared.service';
import { CreateUserOrganisationDto } from './dto/create-shared.dto';

@Controller('api/organisations')
export class UserOrganisationController {
  constructor(
    private readonly userOrganisationService: UserOrganisationService,
  ) {}

  @Post()
  create(@Body() createOrganisationDto: CreateUserOrganisationDto) {
    return this.userOrganisationService.create(createOrganisationDto);
  }

  @Get()
  findAll() {
    return this.userOrganisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOrganisationService.findById(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrganisationDto: UpdateOrganisationDto,
  // ) {
  //   return this.userOrganisationService.update(id, updateOrganisationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOrganisationService.remove(id);
  }
}

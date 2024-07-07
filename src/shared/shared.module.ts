import { Module } from '@nestjs/common';
import { UserOrganisationService } from './shared.service';
import { UserOrganisationController } from './shared.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganisation } from './entities/shared.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganisation])],
  controllers: [UserOrganisationController],
  providers: [UserOrganisationService],
  exports: [TypeOrmModule, UserOrganisationService],
})
export class UserOrganisationModule {}

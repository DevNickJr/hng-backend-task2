import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisation } from './entities/organisation.entity';
import { UserModule } from 'src/user/user.module';
import { UserOrganisationModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organisation]),
    UserModule,
    UserOrganisationModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [TypeOrmModule, OrganisationService],
})
export class OrganisationModule {}

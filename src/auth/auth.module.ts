import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { UserOrganisationModule } from 'src/shared/shared.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '36000s' },
    }),
    UserModule,
    OrganisationModule,
    UserOrganisationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

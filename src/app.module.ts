import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganisationModule } from './organisation/organisation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
// import { Organisation } from './organisation/entities/organisation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'postgres',
      // entities: [User, Organisation],
      synchronize: true, // remove on production
      logging: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

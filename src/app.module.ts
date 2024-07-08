import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganisationModule } from './organisation/organisation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganisationModule } from './shared/shared.module';
import { config } from 'dotenv';

config();

const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;
const PGUSER = process.env.PGUSER;
const POSTGRES_DB = process.env.POSTGRES_DB;

console.log({
  PGHOST,
  PGPASSWORD,
  PGPORT,
  PGUSER,
  POSTGRES_DB,
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PGHOST || 'dpg-cq5ho5uehbks73bpd800-a',
      port: PGPORT ? Number(PGPORT) : 5432,
      username: PGUSER || 'task2',
      password: PGPASSWORD || 'pwYZzT0aVgExeQE90dAiORkdxBcg7Z7Q',
      database: POSTGRES_DB || 'task2_tyql',
      // entities: [User, Organisation],
      synchronize: true, // remove on production
      logging: false,
      autoLoadEntities: true,
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '12345678',
      // database: 'postgres',
      // // entities: [User, Organisation],
      // synchronize: true, // remove on production
      // logging: false,
      // autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    OrganisationModule,
    UserOrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

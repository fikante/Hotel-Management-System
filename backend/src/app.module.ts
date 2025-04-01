import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './v1/v1.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff_Auth } from './v1/auth/entities/staff.entity';
import { Guest_Auth } from './v1/auth/entities/guest.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      connectorPackage: 'mysql2',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test_auth_module',
      entities: [Staff_Auth, Guest_Auth],
      synchronize: true, // set to false in production
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

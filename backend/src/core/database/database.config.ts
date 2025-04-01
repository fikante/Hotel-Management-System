import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Staff_Auth } from 'src/v1/auth/entities/staff.entity';
import { Guest_Auth } from 'src/v1/auth/entities/guest.entity';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERNAME,
    entities: [Staff_Auth, Guest_Auth],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  };
});

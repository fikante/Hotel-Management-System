// src/common/database/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  username: 'sql12768585',
  password: 'MCLpLavKU5',
  database: 'sql12768585',
  entities: [], //put entities here
  synchronize: true,
};
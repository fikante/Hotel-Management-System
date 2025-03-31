import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { StaffAuthController } from './controllers/staff-auth.controller';
import { AuthService } from './services/auth.service';
import { StaffAuthService } from './services/staff-auth.service';
import { Guest_Auth } from './entities/guest.entity';
import { Staff_Auth } from './entities/staff.entity';
import { JwtStrategy, StaffJwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Register the Guest_Auth and Staff_Auth entities for use with TypeORM.
    TypeOrmModule.forFeature([Guest_Auth, Staff_Auth]),

    // Import PassportModule to enable authentication features.
    PassportModule,

    // Register JwtModule for regular users using the JWT_SECRET.
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT secret key for regular users (loaded from .env)
      signOptions: { expiresIn: '1h' }, // Token expiration set to 1 hour
    }),

    // Register another instance of JwtModule for staff using the STAFF_JWT_SECRET.
    JwtModule.register({
      secret: process.env.STAFF_JWT_SECRET, // JWT secret key for staff members (loaded from .env)
      signOptions: { expiresIn: '1h' }, // Token expiration set to 1 hour
    }),
  ],
  // Define the controllers for authentication-related endpoints.
  controllers: [AuthController, StaffAuthController],

  // Provide the services and strategies for dependency injection.
  providers: [AuthService, StaffAuthService, JwtStrategy, StaffJwtStrategy],
})
export class AuthModule {}

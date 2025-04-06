import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Booking } from '../../../common/entities/booking.entity';
import { User } from '../../../common/entities/user.entity';

/**
 * Dashboard Module - Provides hotel analytics and reporting functionality
 * 
 * This module handles:
 * - Hotel booking statistics
 * - Guest demographics
 * - Country-wise booking data
 * - Other hotel performance metrics
 * 
 * Requires TypeORM entities: Booking and User
 */
@Module({
  imports: [
    // Register TypeORM entities that will be used in this module
    TypeOrmModule.forFeature([
      Booking, // Entity for accessing booking data
      User    // Entity for accessing user/guest information
    ])
  ],
  controllers: [DashboardController], // Contains all dashboard-related endpoints
  providers: [DashboardService],     // Contains business logic for dashboard operations
})
export class DashboardModule {}

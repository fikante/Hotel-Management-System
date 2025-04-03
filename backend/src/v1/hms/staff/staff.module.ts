// src/hms/staff/staff.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Staff } from 'src/common/entities/staff.entity';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Hotel])],
  controllers: [StaffController],
  providers: [StaffService,EmailService],
  exports: [StaffService],
})
export class StaffModule {}
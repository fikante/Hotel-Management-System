import { Module } from '@nestjs/common';
import { HmsService } from './hms.service';
import { HmsController } from './hms.controller';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [DashboardModule],
  providers: [HmsService],
  controllers: [HmsController]
})
export class HmsModule {}

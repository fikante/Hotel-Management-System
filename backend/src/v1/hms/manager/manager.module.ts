import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/common/entities/manager.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Hotel])], // Add your entities here
  providers: [ManagerService, ImageUploadService, EmailService],
  controllers: [ManagerController]
})
export class ManagerModule {}

import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/common/entities/admin.entity';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService, ImageUploadService, EmailService],
  controllers: [AdminController]
})
export class AdminModule {}

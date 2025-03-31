import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { Hotel } from '../entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from '../image-upload.service';

@Module({
  imports:[TypeOrmModule.forFeature([Room, Hotel])],
  controllers: [RoomsController],
  providers: [RoomsService, ImageUploadService]
})
export class RoomsModule {}

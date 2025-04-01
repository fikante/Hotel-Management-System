import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { Hotel } from '../entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { Booking } from 'src/common/entities/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Room, Hotel,Booking])],
  controllers: [RoomsController],
  providers: [RoomsService, ImageUploadService],
  exports:[RoomsService]
})
export class RoomsModule {}

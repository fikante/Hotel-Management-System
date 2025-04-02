import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelService } from './hotels.service';
import { RoomsModule } from './rooms/rooms.module';
import { ImageUploadService } from '../../common/services/image-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/common/entities/hotel.entity';

@Module({
  imports: [RoomsModule,TypeOrmModule.forFeature([Hotel]),],
  controllers: [HotelsController],
  providers: [HotelService,ImageUploadService]
})
export class HotelsModule {}

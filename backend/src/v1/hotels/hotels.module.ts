import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelService } from './hotels.service';
import { RoomsModule } from './rooms/rooms.module';
import { ImageUploadService } from './image-upload.service';
import { Hotel } from './entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RoomsModule,TypeOrmModule.forFeature([Hotel]),],
  controllers: [HotelsController],
  providers: [HotelService,ImageUploadService]
})
export class HotelsModule {}

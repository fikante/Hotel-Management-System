
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../entitties/room.entity';
import { Amenity } from '../entitties/amenity.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Amenity]),
    CloudinaryModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
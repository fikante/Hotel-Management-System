/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';
import { Booking } from 'src/common/entities/booking.entity';
import { Room } from 'src/common/entities/room.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { User } from 'src/common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, Hotel, User])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingsModule {}
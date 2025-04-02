import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAllBookings(hotelId: number) {
    const bookings = await this.bookingRepository.find({
      where: { hotel: { id: hotelId } },
      relations: ['room','guest'],
    });
    return {
      success: true,
      data: bookings.map(booking => ({
        bookingId: booking.id,
        guestName: booking.guest.name,
        roomNum: booking.room.roomNumber,
        bookingType: 'individual',
        roomType: booking.room.type,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.bookingStatus,
        createdAt: booking.createdAt,
      })),
    };
  }
}
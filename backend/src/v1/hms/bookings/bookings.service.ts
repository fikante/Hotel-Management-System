import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entitties/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAllBookings(hotelId: string) {
    return this.bookingRepository.find({
      where: { hotel: { id: hotelId } },
      select: [
        'id',
        'guestName',
        'roomNum',
        'bookingType',
        'roomType',
        'checkIn',
        'checkOut',
        'status',
        'createdAt',
      ],
    });
  }
}
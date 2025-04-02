/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Room } from 'src/common/entities/room.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllBookings() {
    const bookings = await this.bookingRepository.find({ relations: ['room', 'hotel'] });
    return {
      success: true,
      data: bookings.map(booking => ({
        bookingId: booking.id,
        roomType: booking.room.type,
        occupancy: booking.room.occupancy,
        price: booking.room.price,
        hotel: booking.hotel.name,
        roomDescription: booking.room.description,
      })),
    };
  }

  async cancelBooking(bookingId: string): Promise<boolean> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) return false;

    const today = dayjs();
    const checkInDate = dayjs(booking.checkIn);
    if (checkInDate.diff(today, 'day') < 1) return false;

    booking.bookingStatus = 'canceled';
    await this.bookingRepository.save(booking);
    return true;
  }

  async requestCheckIn(bookingId: string) {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) throw new Error('Booking not found');
    // Logic for handling check-in request
  }

  async checkOut(bookingId: string): Promise<number> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId }, relations: ['room'] });
    if (!booking) throw new Error('Booking not found');

    booking.bookingStatus = 'confirmed';
    await this.bookingRepository.save(booking);

    const room = booking.room;
    room.status = 'not clean';
    await this.roomRepository.save(room);

    return booking.room.price;
  }
}

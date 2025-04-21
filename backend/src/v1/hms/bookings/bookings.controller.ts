
import { Controller, Get, Param, Query, UseGuards, Put, Patch, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/common/entities/booking.entity';
// import { AuthGuard } from '../../auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('reservations/bookings')
  async getAllBookings(@Param('hotelId') hotelId: number) {
    const bookings = await this.bookingsService.getAllBookings(hotelId);
    return bookings;
  }
  @Patch('reservations/bookings/:bookingId')
  async updateBooking(
    @Param('hotelId') hotelId: number,
    @Param('bookingId') bookingId: string,
    @Body() updateData: Partial<Booking>,
  ) {
    const result = await this.bookingsService.updateBooking(bookingId, updateData, hotelId);
    return result;
  }
}
/* eslint-disable prettier/prettier */
import { Controller, Get, Delete, Patch, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { BookingService } from './bookings.service';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('bookings')
// @UseGuards(AuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Delete(':bookingId')
  async cancelBooking(@Param('bookingId') bookingId: string) {
    const success = await this.bookingService.cancelBooking(bookingId);
    if (!success) {
      throw new HttpException('Cancellation not allowed', HttpStatus.BAD_REQUEST);
    }
    return { success: true, message: 'Booking canceled successfully' };
  }

  @Patch(':bookingId/check-in')
  async requestCheckIn(@Param('bookingId') bookingId: string) {
    await this.bookingService.requestCheckIn(bookingId);
    return { success: true, message: 'Check-in requested, pending staff validation' };
  }

  @Patch(':bookingId/check-out')
  async checkOut(@Param('bookingId') bookingId: string) {
    const totalAmount = await this.bookingService.checkOut(bookingId);
    return { success: true, message: 'Check-out successful', totalAmount };
  }
}

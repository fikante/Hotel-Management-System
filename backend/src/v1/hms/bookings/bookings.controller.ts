
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('api/v1/hms/reservations/bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async getAllBookings(@Query('hotelId') hotelId: string) {
    const bookings = await this.bookingsService.getAllBookings(hotelId);
    return { success: true, data: bookings };
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Room } from 'src/common/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAllBookings(hotelId: number) {
    try {
      const bookings = await this.bookingRepository.find({
        where: { hotel: { id: hotelId } },
        relations: ['room', 'guest'],
      });
      return {
        success: true,
        data: bookings.map(booking => ({
          bookingId: booking.id,
          guestId: booking.guest.id,
          guestFirstName: booking.guest.firstName,
          guestLastName: booking.guest.lastName,
          roomNum: booking.room.roomNumber,
          roomType: booking.room.type,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          bookingStatus: booking.bookingStatus,
          createdAt: booking.createdAt,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }

  async updateBooking(
    bookingId: string,
    updateData: Partial<Booking>,
    hotelId: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { 
          id: bookingId,
          hotel: { id: hotelId }
         },
        relations: ['room', 'guest', 'hotel'],
      });
      if (!booking) {
        throw new Error('Booking not found');
      }

      // checkin checkout Room Number, status are the only updatable fields if they are inside updateData
      // console.log('Update data:', updateData);
      if (updateData.checkIn) {
        booking.checkIn = updateData.checkIn;
      }
      if (updateData.checkOut) {
        booking.checkOut = updateData.checkOut;
      }
      if (updateData.bookingStatus) {
        booking.bookingStatus = updateData.bookingStatus;
      }
      if (updateData.room?.id) {
        const roomId = updateData.room.id;
        const room = await this.bookingRepository.manager.findOne(Room, { where: { id: roomId } });
        if (!room) {
          throw new Error('Room not found');
        }
        booking.room = room;
      }
      await this.bookingRepository.save(booking);

      return { success: true, message: 'Booking updated successfully' };
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }
};
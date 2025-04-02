
import { Controller, Get, Post, Param, Body, UseGuards,Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('api/v1/hotels')
export class RoomsController {
  constructor(private readonly roomService: RoomsService){}

  @Get(':hotelId/rooms')
  async getRoomsByHotelId(@Param('hotelId') hotelId: number) {
    const rooms = await this.roomService.getRoomsByHotelId(hotelId); //Fetches all rooms by hotel id 
    return {
      success: true,
      data: rooms,
    };
  }

  @Post(':hotelId/rooms')
  async createRoom(
    @Param('hotelId') hotelId: number,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    const room = await this.roomService.createRoom(hotelId, createRoomDto); //Create new room info in the database 
    return {
      success: true,
      data: room,
    };
  }



  @Get(':hotelId/rooms')
  //@UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  async getAvailableRooms(
    @Param('hotelId') hotelId: number,
    @Query('check_in') checkIn: Date,
    @Query('check_out') checkOut: Date,
    @Query('occupancy') occupancy: number
  ) {
    // Ensure check-in and check-out dates are provided in the query parameters
    if (!checkIn || !checkOut || !occupancy) {
      throw new Error('Missing required query parameters');
    }

    // Get available rooms from the service
    const availableRooms = await this.roomService.getAvailableRooms(
      hotelId,
      checkIn,
      checkOut,
      occupancy
    );

    return {
      success: true,
      data: availableRooms,
    };
  }
}





 




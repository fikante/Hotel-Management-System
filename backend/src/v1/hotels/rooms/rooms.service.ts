/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Room } from 'src/common/entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { Repository,LessThan,MoreThan } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Hotel } from 'src/common/entities/hotel.entity';



@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private imageUploadService: ImageUploadService,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking> 
    
  ) {}

  async getRoomsByHotelId(hotelId: number) {
    const hotel = await this.hotelRepository.findOne({
      where: { id: hotelId },  // Fetches the hotel by id
      relations: ['rooms'], 
    });      // Find the hotel by id and retreives the hotel includes the rooms from the database 

    if (!hotel) {
      throw new Error('Hotel not found');         
    }

    return hotel.rooms;  // Fetches all rooms in the hotel 
  }  


  async getAvailableRooms(
    hotelId: number,
    checkInDate: Date,
    checkOutDate: Date,
  ): Promise<Room[]> {
    // Fetch the hotel with its rooms
    const hotel = await this.hotelRepository.findOne({
      where: { id: hotelId },
      relations: ['rooms'],
    });
  
    if (!hotel) {
      throw new Error('Hotel not found');
    }
  
    // Filter rooms based on occupancy
    let availableRooms = hotel.rooms.filter(
      (room) => room.status !== 'occupied'
    );
  
    // Check room availability by filtering out booked rooms
    const filteredRooms = await Promise.all(
      availableRooms.map(async (room) => {
        const overlappingBookings = await this.bookingRepository.count({
          where: {
            // roomId: { id: room.roomId },
            checkIn: LessThan(checkOutDate) ,
            checkOut: MoreThan(checkInDate) ,
          },
        });
  
        return overlappingBookings === 0 ? room : null;
      })
    );
  
    
    availableRooms = filteredRooms.filter((room): room is Room => room !== null && typeof room === 'object');  // Filters out the null values and ensures room is an object
  
    return availableRooms as Room[];
  }
  



  
  








  





  
}
















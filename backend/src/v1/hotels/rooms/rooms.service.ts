import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageUploadService } from '../image-upload.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from '../entities/hotel.entity';



@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private imageUploadService: ImageUploadService,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private readonly bookingRepository: Repository<Booking> 
    
  ) {}

  async getRoomsByHotelId(hotelId: string) {
    const hotel = await this.hotelRepository.findOne({
      where: { hotelId },
      relations: ['rooms'], 
    });

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    return hotel.rooms; 
  }  


  async createRoom(hotelId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const hotel = await this.hotelRepository.findOne({ where: { hotelId } });

    if (!hotel) {
      throw new Error('Hotel not found');
    }
    if (createRoomDto.image) {
    
        const publicId = `hotel-${Date.now()}`; 
        
  
        
        const imageUrl = await this.imageUploadService.uploadImage(createRoomDto.image, publicId);
  
        
        createRoomDto.image = imageUrl;
      }

    const room = this.roomRepository.create({
      ...createRoomDto,
      hotel, 
    });


    return await this.roomRepository.save(room);
  } 



  async getAvailableRooms(
    hotelId: string,
    checkInDate: string,
    checkOutDate: string,
    occupancy: number
  ) {
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    
    const hotel = await this.hotelRepository.findOne({
      where: { hotelId },
      relations: ['rooms'],
    });

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    
    let availableRooms = hotel.rooms.filter(room => {
      
      if (room.occupancy < occupancy) {
        return false;
      }

      
      return room.status !== 'occupied'; 
    });

    
    availableRooms = await Promise.all(
      availableRooms.map(async (room) => {
        
        const bookings = await this.bookingRepository.find({
          where: {
            roomId: room.roomId,
            checkInDate: { $lt: checkOut }, 
            checkOutDate: { $gt: checkIn }, 
          },
        });

        
        if (bookings.length === 0) {
          return room;
        }
        return null; 
      })
    );

    
    availableRooms = availableRooms.filter(room => room !== null);

    return availableRooms;
  }








  





  
}

















import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entitties/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Amenity } from '../entitties/amenity.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto) {
    const amenities = [];
    if (createRoomDto.amenities) {
      for (const amenityDto of createRoomDto.amenities) {
        let amenity = await this.amenityRepository.findOne({
          where: { amenityName: amenityDto.amenityName }, // ✅ Search by name
        });
        if (!amenity) {
          amenity = this.amenityRepository.create({
            amenityName: amenityDto.amenityName, // ✅ Let DB generate ID
          });
          await this.amenityRepository.save(amenity);
        }
        amenities.push(amenity);
      }
    }
  

    const room = this.roomRepository.create({
      ...createRoomDto,
      hotel: { id: createRoomDto.hotelId },
      amenities,
      status: createRoomDto.status || 'available',
    });

    return this.roomRepository.save(room);
  }
}
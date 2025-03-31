import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity'; 
import { CreateHotelDto } from './dto/create-hotel.dto'; 
import { ImageUploadService } from './image-upload.service'; 
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private imageUploadService: ImageUploadService, 
  ) {}

  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    
    if (createHotelDto.image) {
    
      const publicId = `hotel-${Date.now()}`; 

      
      const imageUrl = await this.imageUploadService.uploadImage(createHotelDto.image, publicId);

      
      createHotelDto.image = imageUrl;
    }

    
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }


  async getHotel(): Promise<Hotel[]> {
    const hotels = await this.hotelRepository.find();
    if (hotels.length == 0) {
        throw new NotFoundException(`Hotel not found`);
      }
      return hotels;
  }



}


















    


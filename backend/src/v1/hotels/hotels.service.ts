import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity'; 
import { CreateHotelDto } from './dto/create-hotel.dto'; 
import { ImageUploadService } from '../../common/services/image-upload.service'; 
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private imageUploadService: ImageUploadService, 
  ) {}

  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    
    if (createHotelDto.image) {  //checks if hotel exists 
    
      const publicId = `hotel-${Date.now()}`; //Generates a publicID

      
      const imageUrl = await this.imageUploadService.uploadImage(createHotelDto.image, publicId); // Gets the imageURl from Cloudinary 

      
      createHotelDto.image = imageUrl;  // swaps the Cloudinary imageUrl for the original Url  
    }

    
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);      //Saves the the request data in the database 
  }


  async getHotel(): Promise<Hotel[]> {
    const hotels = await this.hotelRepository.find();  
    if (hotels.length == 0) {
        throw new NotFoundException(`Hotel not found`);  // Throws 'Hotel not Found exception if there no hotel inside the database 
      }
      return hotels;  //Returns all hotels 
  }



}


















    


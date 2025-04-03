import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto'; 
import { ImageUploadService } from '../../common/services/image-upload.service'; 
import { NotFoundException } from '@nestjs/common';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Food } from 'src/common/entities/food.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { CreateOrderDto } from '../food-menu/dto/create-order.dto';
import { Order } from 'src/common/entities/order.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Food)
    private foodRepository : Repository <Food>,

    @InjectRepository(Booking)
    private bookingRepository : Repository <Booking>,
    @InjectRepository(Order)
    private orderRepository : Repository <Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository : Repository <OrderItem>,
    private imageUploadService: ImageUploadService, 
  ) {}

  //only works with hotel image in the web
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


  
    
    


  
























    


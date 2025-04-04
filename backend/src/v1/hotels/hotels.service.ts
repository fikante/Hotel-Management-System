import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto'; 
import { ImageUploadService } from '../../common/services/image-upload.service'; 
import { NotFoundException } from '@nestjs/common';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Food } from 'src/common/entities/food.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { CreateOrderDto } from './dto/create-order.dto';
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


  async getAllFood(): Promise<Food[]> {
    const foods = await this.foodRepository.find();  
    if (foods.length == 0) {
        throw new NotFoundException(`Foods not found`);  // Throws 'Foods not Found exception if there no hotel inside the database 
      }
      return foods ;  //Returns all Foods
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<{ orderId: string; totalPrice: number; message: string }> {
    const { bookingId, items } = createOrderDto;

    // Check if booking exists
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new NotFoundException('Booking not found.');
    }

    // Process food items
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const food = await this.foodRepository.findOne({ where: { id: item.foodId, status: 'Available' } });

      if (!food) {
        throw new NotFoundException(`Food item with ID ${item.foodId} not found or unavailable.`);
      }

      const itemTotal = food.price * item.quantity;
      totalPrice += itemTotal;

      const orderItem = this.orderItemRepository.create({
        food,
        quantity: item.quantity,
        price: itemTotal,
      });

      orderItems.push(orderItem);
    }

    // Create order
    const order = this.orderRepository.create({
      booking,
      items: orderItems,
      totalPrice,
      status: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    // Save order items
    for (const orderItem of orderItems) {
      orderItem.order = savedOrder;
      await this.orderItemRepository.save(orderItem);
    }

    return {
      orderId: savedOrder.id,
      totalPrice,
      message: 'Food order placed successfully',
    };
  }
  async getAllOrders() {
    const orders = await this.orderRepository.find({
      relations: ['booking', 'items', 'items.food', 'booking.room'],
    });

    // Mapping the result 
    return orders.map((order) => ({
      orderId: order.id,
      roomNo: order.booking.room.id,
      foodItems: order.items.map((item) => ({
        name: item.food.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      time : order.createdAt,
      specialRequest: order.specialRequest,
    }));
  }







  
}


  
    
    


  
























    


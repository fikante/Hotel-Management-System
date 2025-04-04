import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Booking } from 'src/common/entities/booking.entity';
import { Order } from 'src/common/entities/order.entity';
import { OrderItem } from 'src/common/entities/order-item.entity';


@Injectable()
export class FoodService {
  constructor(
  @InjectRepository(Hotel)
   private hotelRepository: Repository<Hotel>,
   @InjectRepository(Booking)
   private bookingRepository : Repository <Booking>,
   @InjectRepository(Order)
   private orderRepository : Repository <Order>,
   @InjectRepository(OrderItem)
   private orderItemRepository : Repository <OrderItem>,
  @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Hotel)
    private readonly hotelRepostiory: Repository<Hotel>,
  ) {}

  async addFoodItem(createFoodDto: CreateFoodDto, hotelId: number) {
    // Validate the hotelId
    const hotel = await this.hotelRepostiory.findOne({
          where: { id: hotelId },});
    
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    // Create a new food item
    const food = this.foodRepository.create({
      ...createFoodDto,
      hotel: hotel,
    });
    return this.foodRepository.save(food);
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
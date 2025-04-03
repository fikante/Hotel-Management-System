import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';


@Injectable()
export class FoodService {
  constructor(
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


  
}
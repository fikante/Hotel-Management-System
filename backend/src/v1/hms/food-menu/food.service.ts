import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../entitties/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async addFoodItem(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create({
      ...createFoodDto,
      hotel: { id: createFoodDto.hotelId },
    });
    return this.foodRepository.save(food);
  }
}
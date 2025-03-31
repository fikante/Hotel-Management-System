
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/hms/food')
@UseGuards(AuthGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFoodItem(@Body() createFoodDto: CreateFoodDto) {
    await this.foodService.addFoodItem(createFoodDto);
    return { success: true, message: 'Food item added successfully' };
  }
}
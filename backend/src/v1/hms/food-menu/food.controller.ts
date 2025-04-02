
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('food')
  async addFoodItem(
    @Param('hotelId') hotelId: number,
    @Body() createFoodDto: CreateFoodDto) 
    {
    await this.foodService.addFoodItem(createFoodDto,hotelId);
    return { success: true, message: 'Food item added successfully' };
  }
}
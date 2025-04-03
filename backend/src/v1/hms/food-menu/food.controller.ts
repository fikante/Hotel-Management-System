
import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { Ingredient } from 'src/common/entities/ingredient.entity';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('hms/hotels/:hotelId')
// @UseGuards(AuthGuard)
export class FoodController {
  constructor
  (
    private readonly foodService: FoodService,
    private imageUploadService: ImageUploadService
  ) {}

  @Post('food')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads/' }))
  async addFoodItem(
    @UploadedFile() file: Express.Multer.File,
    @Param('hotelId') hotelId: number,
    @Body() createFoodDto: CreateFoodDto) 
    {

    createFoodDto.ingredients = JSON.parse(createFoodDto.ingredients as unknown as string);
    console.log(createFoodDto.ingredients);
    const uploadedImage = await this.imageUploadService.uploadImage(file.path, `food-${Date.now()}`);
    createFoodDto.image = uploadedImage;
    

    await this.foodService.addFoodItem(createFoodDto,hotelId);
    return { success: true, message: 'Food item added successfully', image: createFoodDto.image };
  }
}
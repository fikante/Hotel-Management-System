import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { ImageUploadService } from 'src/common/services/image-upload.service';
import { Ingredient } from 'src/common/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Hotel, Ingredient])],
  controllers: [FoodController],
  providers: [FoodService,ImageUploadService],
})
export class FoodModule {}
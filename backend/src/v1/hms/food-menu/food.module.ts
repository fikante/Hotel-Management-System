import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Hotel])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
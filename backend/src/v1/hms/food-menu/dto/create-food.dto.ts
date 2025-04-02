
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  hotelId: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  categories: string;

  @IsNumber()
  @IsOptional()
  timeToMake?: number;
}

import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Ingredient } from 'src/common/entities/ingredient.entity';

export class CreateFoodDto {

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  categories: string;

  @IsString()
  image: string;

  @IsString()
  timeToMake: string;

  @IsString()
  ingredients: Ingredient[];
}
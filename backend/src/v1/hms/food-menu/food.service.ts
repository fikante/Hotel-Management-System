import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Ingredient } from 'src/common/entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';


@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(Hotel)
    private readonly hotelRepostiory: Repository<Hotel>,

    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async addFoodItem(createFoodDto: CreateFoodDto, hotelId: number) {

    const createIngredientDto = new CreateIngredientDto(); 
    // Validate the hotelId
    const hotel = await this.hotelRepostiory.findOne({
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    // Check and process ingredients
    const ingredients = await Promise.all(
      createFoodDto.ingredients.map(async (ingredientName) => {
        // Check if the ingredient exists
        let ingredient = await this.ingredientRepository.findOne({
          where: { name: ingredientName as unknown as string },
        });

        // If it doesn't exist, create and save it
        if (!ingredient) {
          ingredient = this.ingredientRepository.create(createIngredientDto);
          ingredient = await this.ingredientRepository.save(ingredient);
        }

        return ingredient;
      })
    );

    // Create a new food item and associate it with the hotel and ingredients
    const food = this.foodRepository.create({
      ...createFoodDto,
      hotel: hotel,
      ingredients: ingredients, // Associate the ingredients with the food item
      timeToMake: createFoodDto.timeToMake, // Convert timeToMake to a number
    });

    return this.foodRepository.save(food);
  } 


  
}
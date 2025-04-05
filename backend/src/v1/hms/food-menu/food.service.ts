import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from 'src/common/entities/food.entity';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Ingredient } from 'src/common/entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Order } from 'src/common/entities/order.entity';


@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(Hotel)
    private readonly hotelRepostiory: Repository<Hotel>,

    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,


  ) { }

  async addFoodItem(createFoodDto: CreateFoodDto, hotelId: number) {


    // Validate the hotelId
    const hotel = await this.hotelRepostiory.findOne({
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new Error('Hotel not found');
    }
    console.log('before', createFoodDto.ingredients);
    // output is before [ 'Beef', 'lettuce', 'onion' ]

    // Validate ingredients
    if (!createFoodDto.ingredients || createFoodDto.ingredients.length === 0) {
      throw new Error('Ingredients are required');
    }

    // Map ingredients to objects with a name property if they are strings
    createFoodDto.ingredients = createFoodDto.ingredients.map((ingredient) =>
      typeof ingredient === 'string' ? ({ name: ingredient } as unknown as Ingredient) : (ingredient as Ingredient),
    );

    for (const ingredientDto of createFoodDto.ingredients) {
      console.log('ingredientDto', ingredientDto); // { name: 'Beef' }
      console.log('ingredientDto', ingredientDto.name); // Beef

      if (!ingredientDto.name || ingredientDto.name.trim() === '') {
        throw new Error('Each ingredient must have a valid name');
      }
    }

    // Validate and create ingredients
    const ingredients: Ingredient[] = [];
    for (const ingredientDto of createFoodDto.ingredients) {
      let ingredient = await this.ingredientRepository.findOne({
        where: { name: ingredientDto.name },
      });

      if (!ingredient) {
        ingredient = this.ingredientRepository.create(ingredientDto);
        ingredient = await this.ingredientRepository.save(ingredient);
      }

      ingredients.push(ingredient);
    }
    // Create a new food item and associate it with the hotel and ingredients
    const food = this.foodRepository.create({
      ...createFoodDto,
      hotel: hotel,
      ingredients: ingredients, // Associate the ingredients with the food item
      timeToMake: createFoodDto.timeToMake, // Convert timeToMake to a number
    });

    return this.foodRepository.save(food);
  }

  async deleteFoodItem(id: string, hotelId: number) {
    const foodItem = await this.foodRepository.findOne({ where: { hotel: { id: hotelId }, id: id } });
    if (!foodItem) {
      throw new NotFoundException('Food item not found');
    }
    await this.foodRepository.delete(id);
    return { success: true, message: 'Food item deleted successfully' };
  }

  // async getAllOrders(hotelId: number) {
  //   // Fetch orders with related entities
  //   const orders = await this.orderRepository.find({
  //     where: { booking: { hotel: { id: hotelId } } },
  //     relations: ['items', 'items.food', 'booking', 'booking.hotel'],
  //   });

  //   if (orders.length === 0) {
  //     throw new NotFoundException(`Orders not found`);
  //   }

  //   // Map orders and handle duplicate items
  //   const mappedOrders = orders.map((order) => {
  //     // Use a Map to ensure unique items based on their `food` and `price`
  //     const uniqueItemsMap = new Map<string, { id: string; food: string; quantity: number; price: string }>();

  //     order.items.forEach((item) => {
  //       const key = `${item.food?.id}-${item.price}`; // Unique key based on food ID and price

  //       if (uniqueItemsMap.has(key)) {
  //         // If the item already exists, aggregate the quantity
  //         const existingItem = uniqueItemsMap.get(key);
  //         if (existingItem) {
  //           existingItem.quantity += item.quantity;
  //         }
  //       } else {
  //         // Otherwise, add the item to the map
  //         uniqueItemsMap.set(key, {
  //           id: item.id,
  //           food: item.food?.name || 'Unknown',
  //           quantity: item.quantity,
  //           price: String(item.price),
  //         });
  //       }
  //     });

  //     // Convert the map values to an array
  //     const aggregatedItems = Array.from(uniqueItemsMap.values());

  //     return {
  //       id: order.id,
  //       items: aggregatedItems,
  //       totalPrice: order.totalPrice,
  //       status: order.status,
  //     };
  //   });

  //   return {
  //     success: true,
  //     data: mappedOrders,
  //   };
  // }
}
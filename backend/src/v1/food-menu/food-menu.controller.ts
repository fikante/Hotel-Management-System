import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FoodMenuService } from './food-menu.service';

@Controller('hotels/:hotelId')
export class FoodMenuController {

    constructor(private readonly foodMenuService: FoodMenuService) {}

    @Get('Menu')
    async getAllFood() {
     const foods = await this.foodMenuService.getAllFood();
     return { 
        Sucess : true ,
        data :  foods
     }
    }
    
    @Post('orders')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log('Received createOrderDto:', createOrderDto); // Debug log
        return this.foodMenuService.createOrder(createOrderDto);
    }
}

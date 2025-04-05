/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { HotelService } from './hotels.service';
import {Post, Body, Get, Param } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { CreateOrderDto } from '../food-menu/dto/create-order.dto';
import { create } from 'domain';



@Controller('hotels')
export class HotelsController {

   constructor(private hotelService : HotelService){}

   @Get()
   async getHotel() {
      const hotel = await this.hotelService.getHotel();
      return { 
         Sucess : true ,
         data : hotel 
      }
  }
  @Post()
  async CreateHotel(@Body() createhoteldto:CreateHotelDto) {
     const hotel = await this.hotelService.createHotel(createhoteldto);
     return { Sucess : true ,
      data : hotel 
     }
  }

  @Get(':hotelId/Menu')

  async getAllFood() {
   const foods = await this.hotelService.getAllFood();
   return { 
      Sucess : true ,
      data :  foods
   }
}






}

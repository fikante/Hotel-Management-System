import { Controller } from '@nestjs/common';
import { HotelService } from './hotels.service';
import {Post, Body, Get, Param } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';




@Controller('hotels')
export class HotelsController {

    constructor(private hotelService : HotelService){}


    @Get()
     async getHotel() {
    return this.hotelService.getHotel();
  }

  
  @Post()
  async CreateHotel(@Body() createhoteldto:CreateHotelDto) {
    return this.hotelService.createHotel(createhoteldto);
  }







}

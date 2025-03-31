import { Body, Controller, Post } from '@nestjs/common';
import { HotelsService } from './hote.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('api/v1/hms/hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    const hotel = await this.hotelsService.createHotel(createHotelDto);
    return {
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    };
  }
}
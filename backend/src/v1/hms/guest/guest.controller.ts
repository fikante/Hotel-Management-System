import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestService } from './guest.service';

@Controller('hotels/:hotelId')
export class GuestController {

    constructor(
        private guestService: GuestService
    ) { }

    @Post('guest')
    async createGuest(
        @Body() createGuestDto: CreateGuestDto,
    ) {
        return await this.guestService.createGuest(createGuestDto);
    }

    @Get('guests')
    async getAllGuests(
    ){
        return await this.guestService.getAllGuests();
    }

    


}

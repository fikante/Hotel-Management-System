// src/hms/staff/staff.controller.ts
import { 
  Controller, 
  Post, 
  Patch, 
  Get, 
  Body, 
  Param, 
  Headers, 
  UseGuards, 
  UsePipes,
  ValidationPipe,
  Query
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { GetStaffDto } from './dto/get-staff.dto';

@Controller('hms/staff')
@UsePipes(new ValidationPipe())
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async addStaff(
    @Headers('authorization') authorization: string,
    @Body() createStaffDto: CreateStaffDto,
  ) {
    console.log(createStaffDto);
    return this.staffService.createStaff(createStaffDto);
  }

  @Patch(':id')
  async assignStaffToRoom(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.staffService.assignTask(id, assignTaskDto);
  }

  @Get('hotel/:hotelId')
  async getAllStaff(
    @Param('hotelId') hotelId: string,
  ) {
    return this.staffService.getAllStaff({hotelId});
  }
}
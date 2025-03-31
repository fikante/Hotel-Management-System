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
  ValidationPipe
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('api/v1/hms/staff')
@UseGuards(AuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @Roles(Role.Manager)
  async addStaff(
    @Headers('authorization') authorization: string,
    @Body() createStaffDto: CreateStaffDto,
  ) {
    return this.staffService.createStaff(createStaffDto);
  }

  @Patch(':id')
  @Roles(Role.Manager)
  async assignStaffToRoom(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.staffService.assignTask(id, assignTaskDto);
  }

  @Get()
  @Roles(Role.Manager, Role.Admin)
  async getAllStaff(@Body() getStaffDto: GetStaffDto) {
    return this.staffService.getAllStaff(getStaffDto);
  }
}
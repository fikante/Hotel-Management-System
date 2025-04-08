import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dtos/createManagerDto';

@Controller('manager')
export class ManagerController {

    constructor(
        private managerService: ManagerService,
    ) { }

    @Post()
    async createManager(
        @Body() createManagerDto: CreateManagerDto
    ) {
        return await this.managerService.createManager(createManagerDto);
    }

    @Get()
    async getAllManagers() {
        return await this.managerService.getAllManagers();
    }

    @Delete(':id')
    async deleteManager(@Param('id') id: string) {
        return await this.managerService.deleteManager(id);
    }

}

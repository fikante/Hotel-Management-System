import { Controller, Get, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('hotels/:hotelId/manager')
export class ManagerController {

    constructor(
        private readonly managerService: ManagerService,
    ) { }

    @Post()
    async createManager() {
        return await this.managerService.createManager();
    }

    @Get()
    async getAllManagers() {
        return await this.managerService.getAllManagers();
    }

}

import { Injectable } from '@nestjs/common';
import { Manager } from 'src/common/entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {

    constructor(
        private readonly managerRepository: Repository<Manager>,
    ) { }

    async createManager() {
        // Logic to create a manager
        return { message: 'Manager created successfully' };
    }

    async getAllManagers() {
        // Logic to get all managers
        return { message: 'All managers retrieved successfully' };
    }
}

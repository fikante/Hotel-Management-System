import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestService {

    constructor(
        @InjectRepository(User)
        private guestRepostiory: Repository<User>
    ) { }
    async createGuest(createGuestDto: CreateGuestDto): Promise<{ success: boolean, message: string }> {

        const date = new Date()
        try {
            const guest = this.guestRepostiory.create({
                ...createGuestDto,
                createdAt: date,
            })
            await this.guestRepostiory.save(guest)
        } catch (error) {
            console.log('Error message: ', error)
            throw new InternalServerErrorException(error, 'Unable to Create Guest')
        }
        return {
            success: true,
            message: "guest has been added successfully"
        }
    }

    async getAllGuests(): Promise<{ success: boolean, data: any[] }> {
        try {
            const result = await this.guestRepostiory.find();
            const mappedResult = result.map((guest) => ({
                id: guest.id,
                firstName: guest.firstName,
                lastName: guest.lastName,
                gender: guest.gender,
                email: guest.email,
                phone: guest.phone,
                address: guest.address,
                nationality: guest.nationality,
                idType: guest.identificationType,
                idNumber: guest.identificationNumber,
            }));

            return {
                success: true,
                data: mappedResult
            };
        } catch (error) {
            console.log('Error message:', error);
            throw new InternalServerErrorException(error, 'Unable to load guests');
        }
    }
}

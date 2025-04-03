import { IsDateString } from "class-validator";

export class CreateBookingDto {
    @IsDateString({}, { message: 'checkIn must be a valid ISO 8601 date string' })
    checkIn: string; // Use string to match the expected input format

    @IsDateString({}, { message: 'checkOut must be a valid ISO 8601 date string' })
    checkOut: string; // Use string to match the expected input format
}
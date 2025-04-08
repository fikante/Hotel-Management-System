import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateManagerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    
    @IsString()
    address: string;
    
    @IsString()
    dateOfBirth: string;

    @IsString()
    registrationDate: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
    
    @IsString()
    phoneNumber: string;

    @Transform(({ value }) => Number(value))
    hotelId: number;
}
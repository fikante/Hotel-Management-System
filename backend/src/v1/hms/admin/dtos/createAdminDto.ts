import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
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
    role: string = 'admin';
    
    @IsEmail()
    email: string;
    
    @IsString()
    @IsOptional()
    password: string;
    
    @IsString()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    profilePic: string;
}
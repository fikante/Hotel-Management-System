// src/hms/staff/dto/create-staff.dto.ts
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  IsNumber,
  IsPhoneNumber,
  IsUrl,
  IsDateString,
  IsEnum,
  IsOptional
} from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  temporaryPassword: string;

  @IsNotEmpty()
  @IsEnum(['available', 'working'])
  status: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phonenumber: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()

  profilePic: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsDateString()
  employedAt: string;
}
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string; // Ensures a valid URL is provided
}
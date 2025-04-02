
import { IsString, IsNumber, IsUrl, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AmenityDto {
  @IsString()
  amenityName: string;
}

export class CreateRoomDto {
  @IsString()
  hotelId: string;

  @IsString()
  roomNumber: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsNumber()
  occupancy: number;

  @IsNumber()
  bed: number;

  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsOptional() 
  image?: string;

  @IsString()
  description: string;

  @IsNumber()
  size: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AmenityDto)
  @IsOptional()
  amenities?: AmenityDto[];

  @IsString()
  @IsOptional()
  imagePublicId?: string;
}
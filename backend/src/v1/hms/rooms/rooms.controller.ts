
import { 
  Body, 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';;
import { CreateRoomDto } from './dto/create-room.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('api/v1/hms/rooms')
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addRoom(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    try {
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          throw new BadRequestException('Image file too large (max 2MB allowed)');
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          throw new BadRequestException('Invalid image type. Allowed formats: JPEG, PNG, WEBP');
        }

        const uploadResult = await this.cloudinaryService.uploadImage(file);
        createRoomDto.image = uploadResult.url;
        createRoomDto.imagePublicId = uploadResult.public_id;
      }

      await this.roomsService.createRoom(createRoomDto);
      
      return {
        success: true,
        message: 'Room added successfully',
      };
    } catch (error) {
      if (createRoomDto.imagePublicId) {
        try {
          await this.cloudinaryService.deleteImage(createRoomDto.imagePublicId);
        } catch (deleteError) {
          console.error('Failed to cleanup image:', deleteError);
        }
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to add room', {
        cause: error.message,
      });
    }
  }
}
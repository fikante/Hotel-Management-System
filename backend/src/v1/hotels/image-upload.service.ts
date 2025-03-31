import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(imageUrl: string, publicId: string): Promise<string> {
    try {
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        public_id: publicId,
      });
      return uploadResult.secure_url; // Return the secure URL
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Error uploading image');
    }
  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/common/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dtos/createAdminDto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { EmailService } from '../../../common/services/email.service';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private imageUploadService: ImageUploadService,
        private readonly emailService: EmailService,
    ) { }

    async createAdmin(createAdminDto: CreateAdminDto) {

        try {
            const { ...adminDetails } = createAdminDto;
            
            const registeredAdmin = await this.adminRepository.findOne({ where: { email: adminDetails.email } });
            if (registeredAdmin) {
                throw new InternalServerErrorException('Admin already exists');
            }
            
            const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
            const temporaryPassword = Array.from(crypto.getRandomValues(new Uint32Array(12)))
                .map((x) => charset[x % charset.length])
                .join('');
            const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
            adminDetails.password = hashedPassword; 
            



            // upload image to cloudinary
            const publicId = `admin/${Date.now()}`;
            const imageUrl = await this.imageUploadService.uploadImage(createAdminDto.profilePic, publicId);
            adminDetails.profilePic = imageUrl;

            // Create the manager entity and assign the hotel
            const createdAdmin = this.adminRepository.create(
                { ...adminDetails });
                  
            await this.adminRepository.save(createdAdmin);

            try {
                const emailResponse = await this.emailService.sendStaffWelcomeEmail(
                  createAdminDto.email,
                  `${createAdminDto.firstName} ${createAdminDto.lastName}`,
                  temporaryPassword
                );
                console.log('Email sent successfully:', emailResponse);
              } catch (error) {
                console.error('Error sending email:', error);
              }

            return { message: 'Admin created successfully', adminId: createdAdmin.id };
        } catch (error) {
            throw new InternalServerErrorException('Error creating manager: ' + error.message);
        }
    }

    async getAllAdmins() {
        try {
            const admin = await this.adminRepository.find();

            if (!admin || admin.length === 0) {
                throw new NotFoundException('No managers found');
            }

            const AdminsInfo = admin.map(admin => ({
                id: admin.id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                address: admin.address,
                role: admin.role,
                dateOfBirth: admin.dateOfBirth,
                profielPic: admin.profilePic || null,
            }));

            return {
                message: 'Successfully retrieved admins',
                data: AdminsInfo,
            };
        } catch (error) {
            throw new Error('Error retrieving managers: ' + error.message);
        }
    }
    async deleteAdmin(id: string) {
        try {
            const admin = await this.adminRepository.findOne({ where: { id } });
            if (!admin) {
                throw new Error('Admin not found');
            }
            await this.adminRepository.remove(admin);
            return { message: 'Admin deleted successfully' };
        } catch (error) {
            throw new NotFoundException('Admin not found');
        }
    }
}

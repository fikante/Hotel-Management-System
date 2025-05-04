import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/common/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    console.log(email, password)
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) return null;
    
    if  (await bcrypt.compare(password, admin.password)) {
      return admin;
    }
    return null;
  }

  session(admin: Admin): { token: string } {
    const payload = { 
      id: admin.id,
      email: admin.email, 
      role: admin.role,
      firstName: admin.firstName,
      lastName: admin.lastName,
      phone: admin.phoneNumber,
      dateOfBirth: admin.dateOfBirth,
      profilePic: admin.profilePic
    };
    
    
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.STAFF_JWT_SECRET,
        expiresIn: process.env.STAFF_JWT_EXPIRATION,
      }),
    };
  }
  
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new Error('Staff not found');
    bcrypt.hash(
      changePasswordDto.oldPassword,10)
      
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      admin.password,
    );
    if (!isOldPasswordValid) throw new Error('Invalid old password');

    admin.password = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await this.adminRepository.save(admin);
  }

  async findById(id: any) {
    if (!id) return null;
    console.log("here is the id", id)
    return this.adminRepository.findOne({ 
      where: { id },
      select: [
        'id', 
        'email', 
        'role', 
        'firstName', 
        'lastName', 
        'phoneNumber', 
        'dateOfBirth',
        "profilePic",
        "address"
      ]
    });
  }
}

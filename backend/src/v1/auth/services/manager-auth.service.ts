import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Manager } from 'src/common/entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class ManagerAuthService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    private jwtService: JwtService,
  ) {}

  async validateManager(email: string, password: string): Promise<Manager | null> {
    const manager = await this.managerRepository.findOne({ where: { email } });
    console.log(manager)
    if (!manager) return null;
    
    if  (await bcrypt.compare(password, manager.password)) {
      return manager;
    }
    return null;
  }

  session(manager: Manager): { token: string } {
    const payload = { 
      id: manager.id,
      email: manager.email, 
      role: manager.role,
      firstName: manager.firstName,
      lastName: manager.lastName,
      phone: manager.phoneNumber,
      dateOfBirth: manager.dateOfBirth,
      profilePic: manager.profilePic,
      address : manager.address
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
    
    const manager = await this.managerRepository.findOne({ where: { id } });
    if (!manager) throw new Error('Staff not found');
    bcrypt.hash(
      changePasswordDto.oldPassword,10)
      
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      manager.password,
    );
    if (!isOldPasswordValid) throw new Error('Invalid old password');

    manager.password = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await this.managerRepository.save(manager);
  }

  async findById(id: any) {
    if (!id) return null;
    return this.managerRepository.findOne({ 
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

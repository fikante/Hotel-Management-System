// src/hms/staff/staff.service.ts
import { 
  Injectable, 
  NotFoundException,
  ConflictException,
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { Hotel } from 'src/common/entities/hotel.entity';
import { Staff } from 'src/common/entities/staff.entity';
import { EmailService } from '../../../common/services/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private readonly emailService: EmailService,
  ) {}

  async createStaff(createStaffDto: CreateStaffDto, hotelId: number): Promise<{ success: boolean; message: string }> {
    // Check if email already exists

    const targetHotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
    if (!targetHotel) {
      throw new NotFoundException('Hotel not found');
    }
    const existingStaff = await this.staffRepository.findOne({
      where: {
        email: createStaffDto.email,
        hotel: { id: hotelId }, // Only check the hotel ID
      },
      relations: ['hotel'], // Ensure the hotel relation is loaded
    });
    if (existingStaff) {
      throw new ConflictException('Email already in use');
    }
        // 3. Generate and hash password
        const temporaryPassword = this.emailService.generateRandomPassword(); // Using EmailService
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    const staff = this.staffRepository.create({
      ...createStaffDto,
      password: hashedPassword,
      hotel: targetHotel,
      isTemporaryPassword: true,
    });

    await this.staffRepository.save(staff);

    await this.emailService.sendStaffWelcomeEmail(
      createStaffDto.email,
      `${createStaffDto.firstname} ${createStaffDto.lastname}`,
      temporaryPassword
    );

    return {
      success: true,
      message: 'Staff member invited successfully. Temporary password sent via email.',

    };
  }

  async assignTask(
    id: string, 
    assignTaskDto: AssignTaskDto
  ): Promise<{ success: boolean; message: string }> {
    const staff = await this.staffRepository.findOne({ where: { id } });

    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }

    staff.assignedRoomId = assignTaskDto.roomId;
    staff.currentTask = assignTaskDto.task;
    staff.status = 'working';

    await this.staffRepository.save(staff);

    return {
      success: true,
      message: 'Staff assigned to cleaning task',
    };
  }

  async getAllStaff(getStaffDto: GetStaffDto): Promise<{ 
    success: boolean; 
    data: any[] 
  }> {
    const staffMembers = await this.staffRepository.find({
      where: { hotel: { id: Number(getStaffDto.hotelId) } },
      relations: ['hotel'],
    });

    const formattedStaff = staffMembers.map(staff => ({
      staffName: `${staff.firstname} ${staff.lastname}`,
      staffRole: staff.role,
      staffSalary: staff.salary,
      status: staff.status,
      currentTask: staff.currentTask,
      assignedRoomId: staff.assignedRoomId,
    }));

    return {
      success: true,
      data: formattedStaff,
    };
  }
}
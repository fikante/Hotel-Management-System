import { Test, TestingModule } from '@nestjs/testing';
import { StaffAuthService } from './staff-auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Staff } from '../../../common/entities/staff.entity';
import { Hotel } from '../../../common/entities/hotel.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

describe('StaffAuthService', () => {
  let service: StaffAuthService;
  let jwtService: JwtService;
  let staffRepository: Repository<Staff>;

  const mockStaff: Partial<Staff> = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'admin',
    firstname: 'John',
    lastname: 'Doe',
    phonenumber: '1234567890',
    dateOfBirth: new Date(),
    isTemporaryPassword: false,
    status: 'active',
    profilePic: '',
    salary: 0,
    employedAt: new Date(),
    assignments: [],
    hotel: {} as Hotel,
    currentTask: '',
    assignedRoomId: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffAuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: getRepositoryToken(Staff),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StaffAuthService>(StaffAuthService);
    jwtService = module.get<JwtService>(JwtService);
    staffRepository = module.get<Repository<Staff>>(getRepositoryToken(Staff));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateStaff', () => {
    it('should return staff when credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(mockStaff as Staff);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        await Promise.resolve();
        return true;
      });

      const result = await service.validateStaff(email, password);

      expect(result).toEqual(mockStaff);
      expect(staffRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null when staff not found', async () => {
      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(null);

      const result = await service.validateStaff('wrong@email.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(mockStaff as Staff);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        await Promise.resolve();
        return false;
      });

      const result = await service.validateStaff(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return JWT token', () => {
      const result = service.login(mockStaff as Staff);

      expect(result).toEqual({ token: 'test-token' });
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          sub: mockStaff.id,
          staffId: mockStaff.id,
          email: mockStaff.email,
          role: mockStaff.role,
          firstName: mockStaff.firstname,
          lastName: mockStaff.lastname,
          phone: mockStaff.phonenumber,
          dateOfBirth: mockStaff.dateOfBirth,
        },
        {
          secret: process.env.STAFF_JWT_SECRET,
          expiresIn: process.env.STAFF_JWT_EXPIRATION,
        },
      );
    });
  });

  describe('changePassword', () => {
    it('should successfully change password', async () => {
      const changePasswordDto = {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      };

      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(mockStaff as Staff);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        await Promise.resolve();
        return true;
      });
      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
        await Promise.resolve();
        return 'newHashedPassword';
      });
      jest.spyOn(staffRepository, 'save').mockResolvedValue({
        ...mockStaff,
        password: 'newHashedPassword',
      } as Staff);

      await service.changePassword('1', changePasswordDto);

      expect(staffRepository.save).toHaveBeenCalled();
    });

    it('should throw error when staff not found', async () => {
      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(null);

      await expect(service.changePassword('999', {
        oldPassword: 'old',
        newPassword: 'new',
      })).rejects.toThrow('Staff not found');
    });

    it('should throw error when old password is invalid', async () => {
      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(mockStaff as Staff);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
        await Promise.resolve();
        return false;
      });

      await expect(service.changePassword('1', {
        oldPassword: 'wrong',
        newPassword: 'new',
      })).rejects.toThrow('Invalid old password');
    });
  });

  describe('findStaffById', () => {
    it('should return staff when found', async () => {
      const staffWithoutPassword = { ...mockStaff } as Partial<Staff>;
      staffWithoutPassword.password = undefined;

      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(staffWithoutPassword as Staff);

      const result = await service.findStaffById('1');

      expect(result).toEqual(staffWithoutPassword);
      expect(staffRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        select: [
          'id',
          'email',
          'role',
          'firstname',
          'lastname',
          'phonenumber',
          'dateOfBirth',
          'profilePic',
          'employedAt',
          'status',
          'salary',
        ],
      });
    });

    it('should return null when id is not provided', async () => {
      const result = await service.findStaffById(null);
      expect(result).toBeNull();
    });

    it('should return null when staff not found', async () => {
      jest.spyOn(staffRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findStaffById('999');

      expect(result).toBeNull();
    });
  });
});
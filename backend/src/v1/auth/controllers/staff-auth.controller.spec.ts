import { Test, TestingModule } from '@nestjs/testing';
import { StaffAuthController } from './staff-auth.controller';
import { StaffAuthService } from '../services/staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { Staff } from '../../../common/entities/staff.entity';

// Extended Request type for authenticated routes
interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    staffId: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    profilePic: string;
    salary: number;
    employedAt: Date;
    status: string;
  };
}

describe('StaffAuthController', () => {
  let controller: StaffAuthController;
  let service: StaffAuthService;

  const mockStaffAuthService = {
    validateStaff: jest.fn(),
    login: jest.fn(),
    changePassword: jest.fn(),
    findStaffById: jest.fn(),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffAuthController],
      providers: [
        {
          provide: StaffAuthService,
          useValue: mockStaffAuthService,
        },
      ],
    }).compile();

    controller = module.get<StaffAuthController>(StaffAuthController);
    service = module.get<StaffAuthService>(StaffAuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('changePassword', () => {
    const changePasswordDto: ChangePasswordDto = {
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
    };

    const mockRequest = {
      user: {
        staffId: '1',
        sub: '1',
        role: 'staff',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        dateOfBirth: '1990-01-01',
        profilePic: 'profile.jpg',
        salary: 50000,
        employedAt: new Date(),
        status: 'active',
      },
      cookies: {},
      signedCookies: {},
      get: jest.fn(),
      header: jest.fn(),
    } as unknown as AuthenticatedRequest;

    it('should successfully change password', async () => {
      mockStaffAuthService.changePassword.mockResolvedValue(undefined);

      const result = await controller.changePassword(
        mockRequest,
        changePasswordDto,
      );

      expect(mockStaffAuthService.changePassword).toHaveBeenCalledWith(
        mockRequest.user.staffId,
        changePasswordDto,
      );
      expect(result).toEqual({
        success: true,
        message: 'Password changed successfully',
      });
    });

    it('should throw error if staffId is missing', async () => {
      const invalidRequest = {
        user: {
          sub: '1',
          staffId: '',
          role: 'staff',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '1234567890',
          dateOfBirth: '1990-01-01',
          profilePic: 'profile.jpg',
          salary: 50000,
          employedAt: new Date(),
          status: 'active',
        },
        cookies: {},
        signedCookies: {},
        get: jest.fn(),
        header: jest.fn(),
      } as unknown as AuthenticatedRequest;

      await expect(
        controller.changePassword(invalidRequest, changePasswordDto),
      ).rejects.toThrow('Staff ID is missing in the request');
    });
  });

  describe('checkAuth', () => {
    const mockRequest = {
      user: {
        sub: '1',
        staffId: '1',
        role: 'staff',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        dateOfBirth: '1990-01-01',
        profilePic: 'profile.jpg',
        salary: 50000,
        employedAt: new Date(),
        status: 'active',
      },
      cookies: {},
      signedCookies: {},
      get: jest.fn(),
      header: jest.fn(),
    } as unknown as AuthenticatedRequest;

    const mockStaff: Partial<Staff> = {
      id: '1',
      email: 'test@example.com',
      role: 'staff',
      firstname: 'John',
      lastname: 'Doe',
      phonenumber: '1234567890',
      dateOfBirth: new Date('1990-01-01'),
      profilePic: 'profile.jpg',
      salary: 50000,
      employedAt: new Date(),
      status: 'active',
    };

    it('should return staff data when authenticated', async () => {
      mockStaffAuthService.findStaffById.mockResolvedValue(mockStaff);

      const result = await controller.checkAuth(mockRequest);

      expect(mockStaffAuthService.findStaffById).toHaveBeenCalledWith(
        mockRequest.user.sub,
      );
      expect(result).toEqual({
        user: {
          id: mockStaff.id,
          email: mockStaff.email,
          role: mockStaff.role,
          firstName: mockStaff.firstname,
          lastName: mockStaff.lastname,
          phone: mockStaff.phonenumber,
          dateOfBirth: mockStaff.dateOfBirth,
          profilePic: mockStaff.profilePic,
          salary: mockStaff.salary,
          employedAt: mockStaff.employedAt,
          status: mockStaff.status,
        },
      });
    });

    it('should return error when staff not found', async () => {
      mockStaffAuthService.findStaffById.mockResolvedValue(null);

      const result = await controller.checkAuth(mockRequest);

      expect(mockStaffAuthService.findStaffById).toHaveBeenCalledWith(
        mockRequest.user.sub,
      );
      expect(result).toEqual({
        success: false,
        message: 'Staff not found',
      });
    });
  });
}); 
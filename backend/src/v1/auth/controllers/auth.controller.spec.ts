import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
import { User } from '../../../common/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // Mock response object
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;

  // Mock AuthService
  const mockAuthService = {
    signup: jest.fn(),
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    const mockSignupDto: SignupDto = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      address: '123 Test St',
      identificationType: 'passport',
      identificationNumber: 'AB123456',
      dateOfBirth: '1990-01-01',
      role: 'user',
      nationality: 'Test Nation',
      gender: 'male',
    };

    const mockSignupResponse = {
      userId: '123',
      email: 'test@example.com',
    };

    it('should successfully register a new user', async () => {
      mockAuthService.signup.mockResolvedValue(mockSignupResponse);

      await controller.signup(mockSignupDto, mockResponse);

      expect(authService.signup).toHaveBeenCalledWith(mockSignupDto);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'User registered successfully',
        data: mockSignupResponse,
      });
    });

    it('should handle signup errors', async () => {
      const error = new Error('Signup failed');
      mockAuthService.signup.mockRejectedValue(error);

      await expect(
        controller.signup(mockSignupDto, mockResponse),
      ).rejects.toThrow(error);
    });
  });

  describe('login', () => {
    const mockLoginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser: Partial<User> = {
      id: '123',
      email: 'test@example.com',
    };

    const mockToken = 'jwt-token';

    it('should successfully login a user with valid credentials', async () => {
      mockAuthService.validateUser.mockResolvedValue(mockUser as User);
      mockAuthService.login.mockReturnValue({ token: mockToken });

      await controller.login(mockLoginDto, mockResponse);

      expect(authService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password,
      );
      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        token: mockToken,
      });
    });

    it('should return 401 for invalid credentials', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      await controller.login(mockLoginDto, mockResponse);

      expect(authService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials',
      });
    });

    it('should handle login errors', async () => {
      const error = new Error('Login failed');
      mockAuthService.validateUser.mockRejectedValue(error);

      await expect(
        controller.login(mockLoginDto, mockResponse),
      ).rejects.toThrow(error);
    });
  });
});

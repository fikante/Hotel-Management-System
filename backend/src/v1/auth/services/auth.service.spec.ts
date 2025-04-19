// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../common/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let jwtService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        address: '123 Main St',
        identificationType: 'passport',
        identificationNumber: 'AB123456',
        dateOfBirth: '1990-01-01',
        role: 'user',
        nationality: 'US',
        gender: 'male',
      };
      const user = {
        id: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        picture: '',
        phone: '+1234567890',
        password: 'hashedPassword',
        address: '123 Main St',
        identificationType: 'passport',
        identificationNumber: 'AB123456',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        nationality: 'US',
        createdAt: new Date(),
        role: 'user',
        bookings: [],
        hashPassword: async () => {},
      };

      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);

      const result = await service.signup(signupDto);
      expect(result).toEqual({ userId: '123', email: 'test@example.com' });
    });
  });

  describe('validateUser', () => {
    it('should return a user if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        id: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        picture: '',
        phone: '+1234567890',
        password: 'hashedPassword',
        address: '123 Main St',
        identificationType: 'passport',
        identificationNumber: 'AB123456',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        nationality: 'US',
        createdAt: new Date(),
        role: 'user',
        bookings: [],
        hashPassword: async () => {},
      };

      userRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(email, password);
      expect(result).toEqual(user);
    });

    it('should return null if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const user = {
        id: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        picture: '',
        phone: '+1234567890',
        password: 'hashedPassword',
        address: '123 Main St',
        identificationType: 'passport',
        identificationNumber: 'AB123456',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        nationality: 'US',
        createdAt: new Date(),
        role: 'user',
        bookings: [],
        hashPassword: async () => {},
      };

      userRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(email, password);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should generate a JWT token for an authenticated user', async () => {
      const user = {
        id: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        picture: '',
        phone: '+1234567890',
        password: 'hashedPassword',
        address: '123 Main St',
        identificationType: 'passport',
        identificationNumber: 'AB123456',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        nationality: 'US',
        createdAt: new Date(),
        role: 'user',
        bookings: [],
        hashPassword: async () => {},
      };

      jwtService.sign.mockReturnValue('token');

      const result = await service.login(user);
      expect(result).toEqual({ token: 'token' });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;
  let hashService: Partial<HashService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    hashService = {
      compare: jest.fn(),
      hash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: HashService, useValue: hashService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user with correct password', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    (hashService.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toBeDefined();
  });

  it('should return null for invalid password', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    (hashService.compare as jest.Mock).mockResolvedValue(false);

    const result = await service.validateUser('test@example.com', 'wrongpassword');
    expect(result).toBeNull();
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService: jest.Mocked<AuthService> = {
      login: jest.fn().mockResolvedValue({ access_token: 'fake-jwt-token' }),
      register: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await controller.login(loginDto);
    expect(result).toEqual({ access_token: 'fake-jwt-token' });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('should register a user', async () => {
    const dto: RegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await controller.register(dto);
    expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User' });
    expect(authService.register).toHaveBeenCalledWith(dto);
  });
});
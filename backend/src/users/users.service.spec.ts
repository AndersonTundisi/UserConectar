import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRoleEnum } from './entities/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Partial<{
    create: jest.Mock<User, [DeepPartial<User>]>;
    save: jest.Mock<Promise<User>, [User]>;
    find: jest.Mock<Promise<User[]>, []>;
    findOne: jest.Mock<Promise<User | null>, [{ where: { id?: number; email?: string } }]>;
    delete: jest.Mock<Promise<{ affected?: number }>, [number]>;
    createQueryBuilder: jest.Mock<any, any>;
  }>;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: UserRoleEnum.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: null,
  };

  beforeEach(async () => {
    repository = {
      create: jest.fn().mockReturnValue(mockUser),
      save: jest.fn().mockResolvedValue(mockUser),
      find: jest.fn().mockResolvedValue([mockUser]),
      findOne: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
      createQueryBuilder: jest.fn(() => ({
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUser]),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashedpassword');

    const result = await service.create(dto);

    expect(result).toEqual(mockUser);
    expect(repository.create).toHaveBeenCalledWith({
      ...dto,
      password: 'hashedpassword',
    });
    expect(repository.save).toHaveBeenCalledWith(mockUser);
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
    expect(repository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { password: 'newpassword123' };

    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashedpassword');

    (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.update(1, dto);

    expect(result).toEqual({
      ...mockUser,
      ...dto,
      password: 'hashedpassword',
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should remove a user', async () => {
    const result = await service.remove(1);
    expect(result).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});

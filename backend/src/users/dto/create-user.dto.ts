import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha de acesso do usuário',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    enum: UserRoleEnum,
    example: 'user',
    description: 'Role do usuário (admin ou user)',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'Role precisa ser admin ou user' })
  role?: UserRoleEnum;
}
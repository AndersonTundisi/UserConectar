import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Maria Souza',
    description: 'Novo nome do usuário',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'maria.souza@example.com',
    description: 'Novo email do usuário',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'novaSenha456',
    description: 'Nova senha do usuário',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    enum: UserRoleEnum,
    example: 'admin',
    description: 'Novo role do usuário (admin ou user)',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'Role precisa ser admin ou user' })
  role?: UserRoleEnum;
}
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({
    example: 'Admin User',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@admin.com',
    description: 'Email válido para o usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin123',
    description: 'Senha de acesso (mínimo 6 caracteres)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'admin',
    enum: UserRole,
    description: 'Papel/função do usuário: admin ou user',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../users/entities/user.entity';  // ✅ Importando o Enum

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
    example: UserRoleEnum.ADMIN,
    enum: UserRoleEnum,
    description: 'Papel do usuário (admin ou user)',
  })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
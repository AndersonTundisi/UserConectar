import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsString()
  password: string;
}
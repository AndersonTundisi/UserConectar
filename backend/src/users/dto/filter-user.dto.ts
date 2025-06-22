import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user.entity';

export class FilterUserDto {
  @ApiPropertyOptional({
    enum: UserRoleEnum,
    example: 'user',
    description: 'Filtrar usuários por role (admin ou user)',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'Role precisa ser admin ou user' })
  role?: UserRoleEnum;

  @ApiPropertyOptional({
    example: 'name',
    description: 'Campo para ordenação (name ou createdAt)',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'createdAt';

  @ApiPropertyOptional({
    example: 'asc',
    description: 'Direção da ordenação (asc ou desc)',
  })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}
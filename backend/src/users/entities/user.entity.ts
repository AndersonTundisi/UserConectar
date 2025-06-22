import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserRole = UserRoleEnum.USER | UserRoleEnum.ADMIN;

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do usuário',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email único do usuário',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '$2b$10$...',
    description: 'Senha criptografada (bcrypt)',
  })
  @Column()
  password: string;

  @ApiProperty({
    enum: UserRoleEnum,
    example: UserRoleEnum.USER,
    description: 'Role do usuário (admin ou user)',
  })
  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @ApiProperty({
    example: '2025-06-20T22:13:34.342Z',
    description: 'Data de criação do registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2025-06-21T01:45:10.123Z',
    description: 'Data da última atualização do registro',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2025-06-21T01:50:00.000Z',
    description: 'Data e hora do último login do usuário',
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;
}
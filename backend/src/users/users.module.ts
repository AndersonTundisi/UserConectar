import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from '../auth/hash.service'; // 🔥 Importando o HashService

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, HashService], // 🔥 Adiciona aqui
  exports: [UsersService], // 🔥 Exporta UsersService caso AuthModule precise
})
export class UsersModule {}
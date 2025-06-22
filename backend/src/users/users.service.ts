import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário com senha criptografada.
   * @param createUserDto Dados do usuário a ser criado.
   * @returns O usuário criado.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  /**
   * Busca todos os usuários, com filtros opcionais.
   * @param filterDto Filtros opcionais de role e ordenação.
   * @returns Lista de usuários.
   */
  async findAll(filterDto?: FilterUserDto): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (filterDto?.role) {
      query.andWhere('user.role = :role', { role: filterDto.role });
    }

    if (filterDto?.sortBy) {
      const order = filterDto.order === 'desc' ? 'DESC' : 'ASC';
      query.orderBy(`user.${filterDto.sortBy}`, order);
    }

    return query.getMany();
  }

  /**
   * Busca um usuário por ID.
   * @param id ID do usuário.
   * @throws NotFoundException se o usuário não existir.
   * @returns Usuário encontrado.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  /**
   * Busca um usuário por e-mail (para validação de login).
   * @param email E-mail do usuário.
   * @returns Usuário (com campo password) ou null.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  /**
   * Atualiza os dados de um usuário.
   * Se a senha for informada, ela é re-hashada.
   * @param id ID do usuário.
   * @param updateUserDto Dados para atualização.
   * @returns Usuário atualizado.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Remove um usuário por ID.
   * @param id ID do usuário.
   * @throws NotFoundException se o usuário não existir.
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
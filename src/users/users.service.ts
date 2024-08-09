import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dtos/list-users.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, userData);

    return this.usersRepository.save(userEntity);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    const list = users.map((user) => new ListUserDTO(user.id, user.name));
    return list;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkEmail === null) throw new NotFoundException('Email not found');

    return checkEmail;
  }

  async update(id: string, userUpdateData: UpdateUserDTO) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user === null) throw new NotFoundException('User not found');

    Object.assign(user, userUpdateData);

    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) throw new NotFoundException('User not found');
  }
}

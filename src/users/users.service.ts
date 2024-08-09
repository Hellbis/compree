import { Injectable } from '@nestjs/common';
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

    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;

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
    return checkEmail;
  }

  async update(id: string, userData: UpdateUserDTO) {
    await this.usersRepository.update(id, userData);
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
  }
}

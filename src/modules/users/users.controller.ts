import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async criaUsuario(@Body() userData: CreateUserDTO) {
    const usuarioEntity = new UserEntity();
    usuarioEntity.email = userData.email;
    usuarioEntity.password = userData.password;
    usuarioEntity.name = userData.name;

    return await this.usersService.create(usuarioEntity);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() userUpdateData: UpdateUserDTO) {
    return await this.usersService.update(id, userUpdateData);
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}

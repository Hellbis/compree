import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { HashPasswordPipe } from '../../resources/pipes/hash-password.pipe';
import { ListUserDTO } from './dtos/list-users.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async criaUsuario(
    @Body() userData: CreateUserDTO,
    @Body('password', HashPasswordPipe) hashPassword: string,
  ) {
    const userCreated = await this.usersService.create({
      ...userData,
      password: hashPassword,
    });

    return new ListUserDTO(userCreated.id, userCreated.name);
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dtos/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dtos/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;

    return await this.usuarioService.criar(usuarioEntity);
  }

  @Get()
  async listUsuarios() {
    return await this.usuarioService.listar();
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    return await this.usuarioService.atualizar(id, novosDados);
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    return await this.usuarioService.deletar(id);
  }
}

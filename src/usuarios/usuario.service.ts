import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dtos/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dtos/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criar(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listar() {
    const usuarios = await this.usuarioRepository.find();

    return usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
  }

  async atualizar(id: string, novoUsuario: AtualizaUsuarioDTO) {
    return await this.usuarioRepository.update(id, novoUsuario);
  }

  async deletar(id: string) {
    return await this.usuarioRepository.delete(id);
  }
}

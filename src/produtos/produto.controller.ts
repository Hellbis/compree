import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dtos/atualizaProduto.dto';
import { CriaProdutoDTO } from './dtos/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() produto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.nome = produto.nome;
    produtoEntity.usuarioId = produto.usuarioId;
    produtoEntity.valor = produto.valor;
    produtoEntity.quantidade = produto.quantidade;
    produtoEntity.descricao = produto.descricao;
    produtoEntity.categoria = produto.categoria;
    produtoEntity.caracteristicas = produto.caracteristicas;
    produtoEntity.imagens = produto.imagens;

    return await this.produtoService.criar(produtoEntity);
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listar();
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() produto: AtualizaProdutoDTO) {
    return await this.produtoService.atualizar(id, produto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.produtoService.deletar(id);
  }
}

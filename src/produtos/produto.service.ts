import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaProdutoDTO } from './dtos/ListaProduto.dto';
import { AtualizaProdutoDTO } from './dtos/atualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criar(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listar() {
    const produtos = await this.produtoRepository.find();

    return produtos.map((produto) => {
      const listaProduto = new ListaProdutoDTO();
      listaProduto.id = produto.id;
      listaProduto.nome = produto.nome;
      listaProduto.valor = produto.valor;
      listaProduto.quantidade = produto.quantidade;
      listaProduto.descricao = produto.descricao;
      listaProduto.categoria = produto.categoria;
      return listaProduto;
    });
  }

  async atualizar(id: string, novoProduto: AtualizaProdutoDTO) {
    return await this.produtoRepository.update(id, novoProduto);
  }

  async deletar(id: string) {
    return await this.produtoRepository.delete(id);
  }
}

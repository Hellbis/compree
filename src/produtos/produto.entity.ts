import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCaracteristica } from './produto-caracteristica.entity';
import { ProdutoImagem } from './produto-imagem.entity';

@Entity('produtos')
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 255, nullable: false })
  usuarioId: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ nullable: false })
  valor: number;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ length: 255, nullable: false })
  descricao: string;

  @Column({ length: 100, nullable: false })
  categoria: string;

  @OneToMany(
    () => ProdutoCaracteristica,
    (produtoCaracteristica) => produtoCaracteristica.produto,
    {
      cascade: true,
      eager: true,
    },
  )
  caracteristicas: ProdutoCaracteristica[];

  @OneToMany(() => ProdutoImagem, (produtoImagem) => produtoImagem.produto, {
    cascade: true,
    eager: true,
  })
  imagens: ProdutoImagem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // caracteristicas: CaracteristicaProduto[];
  // imagens: ImagemProduto[];
}

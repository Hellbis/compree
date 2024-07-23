import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_imagens')
export class ProdutoImagem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  url: string;

  @Column({ length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}

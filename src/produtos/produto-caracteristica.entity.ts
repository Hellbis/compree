import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_caracteristicas')
export class ProdutoCaracteristica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 255, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}

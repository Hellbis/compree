import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 70, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}

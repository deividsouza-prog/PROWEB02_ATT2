import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projeto } from '../../projetos/entities/projeto.entity';

@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ default: false })
  concluida: boolean;

  // Projeto ao qual a tarefa pertence (opcional).
  @Column({ type: 'int', nullable: true })
  projetoId?: number | null;

  // Se o projeto for excluído, as tarefas ficam "sem projeto" (SET NULL).
  @ManyToOne(() => Projeto, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projetoId', foreignKeyConstraintName: 'FK_tarefas_projeto' })
  projeto?: Projeto;
}

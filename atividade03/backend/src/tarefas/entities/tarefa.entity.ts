import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // Projeto ao qual a tarefa pertence (opcional) - o frontend e o DTO já usam.
  @Column({ type: 'int', nullable: true })
  projetoId?: number;
}

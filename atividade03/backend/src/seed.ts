import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

async function seed() {
  await dataSource.initialize();

  const projetoRepo = dataSource.getRepository(Projeto);
  await projetoRepo.clear();
  await projetoRepo.save([
    { nome: 'Faculdade', descricao: 'Trabalhos e provas do semestre', cor: 'azul' },
    { nome: 'Casa', cor: 'verde' },
  ]);

  const tarefaRepo = dataSource.getRepository(Tarefa);
  await tarefaRepo.clear();
  await tarefaRepo.save([
    { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false },
    { titulo: 'Preparar a aula de hoje', concluida: true },
  ]);

  console.log('Seed concluído!');
  await dataSource.destroy();
}
seed();

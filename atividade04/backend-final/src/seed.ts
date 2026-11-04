import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

// Seeder simples: popula projetos e tarefas com dados iniciais.
async function seed() {
  await dataSource.initialize();

  const tarefaRepo = dataSource.getRepository(Tarefa);
  const projetoRepo = dataSource.getRepository(Projeto);

  // DELETE (e não clear/TRUNCATE) porque tarefas referenciam projetos por FK.
  await tarefaRepo.createQueryBuilder().delete().execute();
  await projetoRepo.createQueryBuilder().delete().execute();

  const [faculdade] = await projetoRepo.save([
    { nome: 'Faculdade', descricao: 'Trabalhos e provas do semestre', cor: 'azul' },
    { nome: 'Casa', cor: 'verde' },
  ]);

  await tarefaRepo.save([
    { titulo: 'Estudar JWT', descricao: 'Autenticação e segurança de APIs', concluida: false, projetoId: faculdade.id },
    { titulo: 'Preparar a aula de hoje', concluida: true },
  ]);

  console.log('Seed concluído!');
  await dataSource.destroy();
}

seed();

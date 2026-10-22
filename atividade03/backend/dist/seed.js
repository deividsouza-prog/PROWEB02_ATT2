"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const tarefa_entity_1 = require("./tarefas/entities/tarefa.entity");
const projeto_entity_1 = require("./projetos/entities/projeto.entity");
async function seed() {
    await data_source_1.default.initialize();
    const projetoRepo = data_source_1.default.getRepository(projeto_entity_1.Projeto);
    await projetoRepo.clear();
    await projetoRepo.save([
        { nome: 'Faculdade', descricao: 'Trabalhos e provas do semestre', cor: 'azul' },
        { nome: 'Casa', cor: 'verde' },
    ]);
    const tarefaRepo = data_source_1.default.getRepository(tarefa_entity_1.Tarefa);
    await tarefaRepo.clear();
    await tarefaRepo.save([
        { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false },
        { titulo: 'Preparar a aula de hoje', concluida: true },
    ]);
    console.log('Seed concluído!');
    await data_source_1.default.destroy();
}
seed();
//# sourceMappingURL=seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const tarefa_entity_1 = require("./tarefas/entities/tarefa.entity");
const projeto_entity_1 = require("./projetos/entities/projeto.entity");
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    username: process.env.DB_USER || 'todo',
    password: process.env.DB_PASS || 'todo',
    database: process.env.DB_NAME || 'todo',
    entities: [tarefa_entity_1.Tarefa, projeto_entity_1.Projeto],
    synchronize: false,
};
const dataSource = new typeorm_1.DataSource({
    ...exports.dataSourceOptions,
    migrations: ['src/migrations/*.ts'],
});
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'todo',
  password: process.env.DB_PASS || 'todo',
  database: process.env.DB_NAME || 'todo',
  entities: [Tarefa, Projeto],
  synchronize: false, // usamos migrations, não auto-sync
};

// DataSource da CLI (conhece as migrations). A app usa só dataSourceOptions.
const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;

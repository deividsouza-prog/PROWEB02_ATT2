import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasModule } from './tarefas/tarefas.module';
import { dataSourceOptions } from './data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjetosModule } from './projetos/projetos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TarefasModule,
    ProjetosModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

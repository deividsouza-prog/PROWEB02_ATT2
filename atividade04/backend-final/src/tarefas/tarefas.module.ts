import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from '../projetos/entities/projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Projeto])],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}

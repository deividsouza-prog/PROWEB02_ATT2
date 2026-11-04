import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from '../projetos/entities/projeto.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepo: Repository<Tarefa>,
    @InjectRepository(Projeto)
    private readonly projetoRepo: Repository<Projeto>,
  ) {}

  // Sem projetoId -> todas; com projetoId -> só as tarefas daquele projeto.
  findAll(projetoId?: number): Promise<Tarefa[]> {
    return this.tarefaRepo.find({
      where: projetoId === undefined ? {} : { projetoId },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepo.findOneBy({ id });
    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return tarefa;
  }

  // Evita erro 500 (violação de FK): projeto inexistente vira 400.
  private async validarProjeto(projetoId?: number | null) {
    if (projetoId === undefined || projetoId === null) return;
    const existe = await this.projetoRepo.existsBy({ id: projetoId });
    if (!existe) {
      throw new BadRequestException('Projeto informado não existe.');
    }
  }

  async create(dto: CreateTarefaDto): Promise<Tarefa> {
    await this.validarProjeto(dto.projetoId);
    const tarefa = this.tarefaRepo.create(dto);
    return this.tarefaRepo.save(tarefa);
  }

  async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.findOne(id);
    await this.validarProjeto(dto.projetoId);
    Object.assign(tarefa, dto);
    return this.tarefaRepo.save(tarefa);
  }

  async remove(id: number): Promise<void> {
    const tarefa = await this.findOne(id);
    await this.tarefaRepo.remove(tarefa);
  }
}

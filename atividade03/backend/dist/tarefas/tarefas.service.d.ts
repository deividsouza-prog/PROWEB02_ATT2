import { Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
export declare class TarefasService {
    private readonly tarefaRepo;
    constructor(tarefaRepo: Repository<Tarefa>);
    findAll(projetoId?: number): Promise<Tarefa[]>;
    findOne(id: number): Promise<Tarefa>;
    create(dto: CreateTarefaDto): Promise<Tarefa>;
    update(id: number, dto: UpdateTarefaDto): Promise<Tarefa>;
    remove(id: number): Promise<void>;
}

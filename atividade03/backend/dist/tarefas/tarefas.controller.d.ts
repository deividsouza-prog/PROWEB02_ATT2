import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';
export declare class TarefasController {
    private readonly tarefasService;
    constructor(tarefasService: TarefasService);
    findAll(projetoId?: string): Promise<import("./entities/tarefa.entity").Tarefa[]>;
    findOne(id: number): Promise<import("./entities/tarefa.entity").Tarefa>;
    create(dto: CreateTarefaDto): Promise<import("./entities/tarefa.entity").Tarefa>;
    update(id: number, dto: UpdateTarefaDto): Promise<import("./entities/tarefa.entity").Tarefa>;
    remove(id: number): Promise<void>;
}

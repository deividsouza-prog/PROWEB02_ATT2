import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { ProjetosService } from './projetos.service';
export declare class ProjetosController {
    private readonly projetosService;
    constructor(projetosService: ProjetosService);
    findAll(): Promise<import("./entities/projeto.entity").Projeto[]>;
    findOne(id: number): Promise<import("./entities/projeto.entity").Projeto>;
    create(dto: CreateProjetoDto): Promise<import("./entities/projeto.entity").Projeto>;
    update(id: number, dto: UpdateProjetoDto): Promise<import("./entities/projeto.entity").Projeto>;
    remove(id: number): Promise<void>;
}

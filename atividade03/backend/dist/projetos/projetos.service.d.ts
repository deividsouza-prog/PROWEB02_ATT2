import { Repository } from 'typeorm';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';
export declare class ProjetosService {
    private readonly projetoRepo;
    constructor(projetoRepo: Repository<Projeto>);
    findAll(): Promise<Projeto[]>;
    findOne(id: number): Promise<Projeto>;
    create(dto: CreateProjetoDto): Promise<Projeto>;
    update(id: number, dto: UpdateProjetoDto): Promise<Projeto>;
    remove(id: number): Promise<void>;
}

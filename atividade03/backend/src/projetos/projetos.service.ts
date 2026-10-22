import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepo: Repository<Projeto>,
  ) {}

  findAll(): Promise<Projeto[]> {
    return this.projetoRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepo.findOneBy({ id });
    if (!projeto) {
      // NotFoundException vira automaticamente uma resposta HTTP 404.
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  create(dto: CreateProjetoDto): Promise<Projeto> {
    const projeto = this.projetoRepo.create(dto);
    return this.projetoRepo.save(projeto);
  }

  async update(id: number, dto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = await this.findOne(id);
    Object.assign(projeto, dto); // atualiza apenas os campos enviados
    return this.projetoRepo.save(projeto);
  }

  async remove(id: number): Promise<void> {
    const projeto = await this.findOne(id);
    await this.projetoRepo.remove(projeto);
  }
}

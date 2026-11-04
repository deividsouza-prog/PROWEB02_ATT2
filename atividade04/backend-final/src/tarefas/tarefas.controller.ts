import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';

@UseGuards(JwtAuthGuard) // exige token válido (cookie) em TODAS as rotas
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  // GET /api/tarefas             -> todas as tarefas
  // GET /api/tarefas?projetoId=1 -> só as tarefas do projeto 1
  @Get()
  findAll(@Query('projetoId') projetoId?: string) {
    if (projetoId === undefined || projetoId === '') {
      return this.tarefasService.findAll();
    }
    const id = Number(projetoId);
    if (!Number.isInteger(id)) {
      throw new BadRequestException('O projetoId deve ser um número inteiro.');
    }
    return this.tarefasService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTarefaDto) {
    return this.tarefasService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTarefaDto) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tarefasService.remove(id);
  }
}

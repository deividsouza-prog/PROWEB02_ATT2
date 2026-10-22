"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarefa_entity_1 = require("./entities/tarefa.entity");
let TarefasService = class TarefasService {
    constructor(tarefaRepo) {
        this.tarefaRepo = tarefaRepo;
    }
    findAll(projetoId) {
        return this.tarefaRepo.find({
            where: projetoId === undefined ? {} : { projetoId },
            order: { id: 'ASC' },
        });
    }
    async findOne(id) {
        const tarefa = await this.tarefaRepo.findOneBy({ id });
        if (!tarefa)
            throw new common_1.NotFoundException('Tarefa não encontrada');
        return tarefa;
    }
    create(dto) {
        const tarefa = this.tarefaRepo.create(dto);
        return this.tarefaRepo.save(tarefa);
    }
    async update(id, dto) {
        const tarefa = await this.findOne(id);
        Object.assign(tarefa, dto);
        return this.tarefaRepo.save(tarefa);
    }
    async remove(id) {
        const tarefa = await this.findOne(id);
        await this.tarefaRepo.remove(tarefa);
    }
};
exports.TarefasService = TarefasService;
exports.TarefasService = TarefasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarefa_entity_1.Tarefa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TarefasService);
//# sourceMappingURL=tarefas.service.js.map
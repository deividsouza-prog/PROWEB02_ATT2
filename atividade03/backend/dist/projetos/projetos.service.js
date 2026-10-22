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
exports.ProjetosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const projeto_entity_1 = require("./entities/projeto.entity");
let ProjetosService = class ProjetosService {
    constructor(projetoRepo) {
        this.projetoRepo = projetoRepo;
    }
    findAll() {
        return this.projetoRepo.find({ order: { id: 'ASC' } });
    }
    async findOne(id) {
        const projeto = await this.projetoRepo.findOneBy({ id });
        if (!projeto) {
            throw new common_1.NotFoundException('Projeto não encontrado');
        }
        return projeto;
    }
    create(dto) {
        const projeto = this.projetoRepo.create(dto);
        return this.projetoRepo.save(projeto);
    }
    async update(id, dto) {
        const projeto = await this.findOne(id);
        Object.assign(projeto, dto);
        return this.projetoRepo.save(projeto);
    }
    async remove(id) {
        const projeto = await this.findOne(id);
        await this.projetoRepo.remove(projeto);
    }
};
exports.ProjetosService = ProjetosService;
exports.ProjetosService = ProjetosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projeto_entity_1.Projeto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjetosService);
//# sourceMappingURL=projetos.service.js.map
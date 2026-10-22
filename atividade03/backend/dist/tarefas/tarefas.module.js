"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tarefas_controller_1 = require("./tarefas.controller");
const tarefas_service_1 = require("./tarefas.service");
const tarefa_entity_1 = require("./entities/tarefa.entity");
let TarefasModule = class TarefasModule {
};
exports.TarefasModule = TarefasModule;
exports.TarefasModule = TarefasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tarefa_entity_1.Tarefa])],
        controllers: [tarefas_controller_1.TarefasController],
        providers: [tarefas_service_1.TarefasService],
    })
], TarefasModule);
//# sourceMappingURL=tarefas.module.js.map
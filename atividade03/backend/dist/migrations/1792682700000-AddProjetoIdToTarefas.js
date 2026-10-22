"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProjetoIdToTarefas1792682700000 = void 0;
class AddProjetoIdToTarefas1792682700000 {
    constructor() {
        this.name = 'AddProjetoIdToTarefas1792682700000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tarefas" ADD "projetoId" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP COLUMN "projetoId"`);
    }
}
exports.AddProjetoIdToTarefas1792682700000 = AddProjetoIdToTarefas1792682700000;
//# sourceMappingURL=1792682700000-AddProjetoIdToTarefas.js.map
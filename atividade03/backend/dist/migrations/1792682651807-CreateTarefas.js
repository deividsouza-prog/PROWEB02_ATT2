"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefas1792682651807 = void 0;
class CreateTarefas1792682651807 {
    constructor() {
        this.name = 'CreateTarefas1792682651807';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tarefas"`);
    }
}
exports.CreateTarefas1792682651807 = CreateTarefas1792682651807;
//# sourceMappingURL=1792682651807-CreateTarefas.js.map
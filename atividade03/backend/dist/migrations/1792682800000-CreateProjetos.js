"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjetos1792682800000 = void 0;
class CreateProjetos1792682800000 {
    constructor() {
        this.name = 'CreateProjetos1792682800000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, "cor" character varying NOT NULL, CONSTRAINT "PK_projetos" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "projetos"`);
    }
}
exports.CreateProjetos1792682800000 = CreateProjetos1792682800000;
//# sourceMappingURL=1792682800000-CreateProjetos.js.map
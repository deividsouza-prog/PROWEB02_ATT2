import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTarefas1792682651807 implements MigrationInterface {
    name = 'CreateTarefas1792682651807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tarefas"`);
    }

}

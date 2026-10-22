import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjetoIdToTarefas1792682700000 implements MigrationInterface {
    name = 'AddProjetoIdToTarefas1792682700000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" ADD "projetoId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP COLUMN "projetoId"`);
    }

}

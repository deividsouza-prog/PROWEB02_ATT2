import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjetos1792682800000 implements MigrationInterface {
    name = 'CreateProjetos1792682800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, "cor" character varying NOT NULL, CONSTRAINT "PK_projetos" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projetos"`);
    }

}

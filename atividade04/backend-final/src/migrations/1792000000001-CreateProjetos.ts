import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjetos1792000000001 implements MigrationInterface {
  name = 'CreateProjetos1792000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, CONSTRAINT "PK_fb6b6aed4b30e10b976fe8bdf5b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projetos"`);
  }
}

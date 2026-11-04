import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCorToProjetos1792000000002 implements MigrationInterface {
  name = 'AddCorToProjetos1792000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // DEFAULT 'azul' preenche os projetos que já existiam.
    await queryRunner.query(
      `ALTER TABLE "projetos" ADD COLUMN IF NOT EXISTS "cor" character varying NOT NULL DEFAULT 'azul'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projetos" DROP COLUMN IF EXISTS "cor"`);
  }
}

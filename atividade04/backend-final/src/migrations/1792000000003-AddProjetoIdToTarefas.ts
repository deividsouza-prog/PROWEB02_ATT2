import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjetoIdToTarefas1792000000003 implements MigrationInterface {
  name = 'AddProjetoIdToTarefas1792000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tarefas" ADD COLUMN IF NOT EXISTS "projetoId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tarefas" ADD CONSTRAINT "FK_tarefas_projeto" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tarefas" DROP CONSTRAINT IF EXISTS "FK_tarefas_projeto"`);
    await queryRunner.query(`ALTER TABLE "tarefas" DROP COLUMN IF EXISTS "projetoId"`);
  }
}

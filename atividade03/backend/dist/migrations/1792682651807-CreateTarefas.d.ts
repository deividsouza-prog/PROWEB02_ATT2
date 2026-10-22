import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateTarefas1792682651807 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

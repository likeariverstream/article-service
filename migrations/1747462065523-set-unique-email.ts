import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetUniqueEmail1747462065523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users"
        ADD CONSTRAINT "unique_email" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE IF EXISTS "users"
      DROP CONSTRAINT IF EXISTS "unique_email"`);
  }
}

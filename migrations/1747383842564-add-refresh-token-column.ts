import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumn1747383842564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users"
          ADD IF NOT EXISTS "refresh_token" VARCHAR(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users"
          DROP COLUMN IF EXISTS "refresh_token"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRefreshTokenType1747465399278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users"
          ALTER COLUMN "refresh_token" TYPE VARCHAR(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users" ALTER COLUMN "refresh_token" TYPE VARCHAR(255)`,
    );
  }
}

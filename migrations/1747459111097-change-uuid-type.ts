import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUuidType1747459111097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users"
        ALTER COLUMN "uuid" TYPE VARCHAR(36)`,
    );

    await queryRunner.query(`ALTER TABLE IF EXISTS "articles"
      ALTER COLUMN "uuid" TYPE VARCHAR(36)`);

    await queryRunner.query(`ALTER TABLE IF EXISTS "articles"
      ALTER COLUMN "author" TYPE VARCHAR(36)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "articles" ALTER COLUMN "author" TYPE VARCHAR(16)`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "articles" ALTER COLUMN "uuid" TYPE VARCHAR(16)`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "users" ALTER COLUMN "uuid" TYPE VARCHAR(16)`,
    );
  }
}

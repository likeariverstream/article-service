import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1747141445032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users"
       (
           uuid          VARCHAR(16) PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
           name          VARCHAR(255)  NOT NULL,
           surname       VARCHAR(255)  NOT NULL,
           email         VARCHAR(255)  NOT NULL,
           hash_password VARCHAR(1000) NOT NULL,
           created_at    TIMESTAMPTZ             DEFAULT NOW(),
           updated_at    TIMESTAMPTZ,
           is_deleted    BOOLEAN                 DEFAULT FALSE
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleTable1747385593878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "articles"
                             (
                                 uuid         VARCHAR(16) PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
                                 title        VARCHAR(255)  NOT NULL,
                                 author       VARCHAR(255)  NOT NULL,
                                 description  VARCHAR(2000) NOT NULL,
                                 published_at TIMESTAMPTZ   NOT NULL,
                                 created_at   TIMESTAMPTZ   NOT NULL  DEFAULT NOW(),
                                 updated_at   TIMESTAMPTZ,
                                 is_deleted   BOOLEAN                 DEFAULT FALSE
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "articles"`);
  }
}

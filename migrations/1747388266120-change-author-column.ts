import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAuthorColumn1747388266120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "articles"
          ALTER COLUMN "author" TYPE VARCHAR(16)`,
    );
    await queryRunner.query(`ALTER TABLE IF EXISTS "articles"
        ADD CONSTRAINT "fk_article_author_uuid" FOREIGN KEY ("author") REFERENCES "users" ("uuid")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "articles"
          DROP CONSTRAINT IF EXISTS "fk_article_author_uuid"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "articles"
          ALTER COLUMN "author" TYPE VARCHAR(255);`,
    );
  }
}

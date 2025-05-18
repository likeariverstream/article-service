import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAuthorColumnName1747493239164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" RENAME COLUMN "author" TO "author_uuid"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" RENAME COLUMN "author_uuid" TO "author"`,
    );
  }
}

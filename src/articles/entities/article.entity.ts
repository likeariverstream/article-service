import { Column, PrimaryGeneratedColumn } from 'typeorm';

type ArticleRow = {
  uuid: string;
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;
  @Column({ type: 'varchar', length: 1000, nullable: false })
  description: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;
  @Column({ type: 'timestamptz', nullable: false, name: 'published_at' })
  publishedAt: Date;
  @Column({ type: 'timestamptz', nullable: false, name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamptz', nullable: true, name: 'updated_at' })
  updatedAt: Date;
  @Column({ type: 'boolean', nullable: false, name: 'is_deleted' })
  isDeleted: boolean;

  constructor(row: ArticleRow) {
    this.uuid = row.uuid;
    this.title = row.title;
    this.description = row.description;
    this.author = row.author;
    this.publishedAt = row.publishedAt;
    this.createdAt = row.createdAt;
    this.updatedAt = row.updatedAt;
    this.isDeleted = row.isDeleted;
  }
}

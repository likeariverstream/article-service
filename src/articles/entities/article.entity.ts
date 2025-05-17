import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

type ArticleRow = {
  uuid: string;
  title: string;
  description: string;
  author: User;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;
  @Column({ type: 'varchar', length: 2000, nullable: false })
  description: string;
  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({
    name: 'uuid',
    referencedColumnName: 'uuid',
    foreignKeyConstraintName: 'fk_article_author_uuid',
  })
  author: User;
  @Column({ type: 'timestamptz', nullable: false, name: 'published_at' })
  publishedAt: Date;
  @Column({ type: 'timestamptz', nullable: false, name: 'created_at' })
  createdAt?: Date;
  @Column({ type: 'timestamptz', nullable: true, name: 'updated_at' })
  updatedAt: Date | null;
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

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

type ArticleRow = {
  uuid: string;
  title: string;
  description: string;
  author: User;
  authorUuid: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
};

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;
  @Column({ type: 'varchar', length: 2000, nullable: false })
  description: string;
  @Column({ type: 'uuid', nullable: false, name: 'author_uuid' })
  authorUuid: string;
  @ManyToOne(() => User, (user) => user.uuid)
  @JoinColumn({
    name: 'author_uuid',
    referencedColumnName: 'uuid',
    foreignKeyConstraintName: 'fk_article_author_uuid',
  })
  author?: User;
  @Column({ type: 'timestamptz', nullable: false, name: 'published_at' })
  publishedAt: string;
  @Column({ type: 'timestamptz', nullable: false, name: 'created_at' })
  createdAt?: string;
  @Column({ type: 'timestamptz', nullable: true, name: 'updated_at' })
  updatedAt: string | null;
  @Column({ type: 'boolean', nullable: false, name: 'is_deleted' })
  isDeleted: boolean;
  /* Required for strict mode in tsconfig.json */
  constructor(row: ArticleRow) {
    this.uuid = row.uuid;
    this.title = row.title;
    this.description = row.description;
    this.author = row.author;
    this.publishedAt = row.publishedAt;
    this.createdAt = row.createdAt;
    this.updatedAt = row.updatedAt;
    this.isDeleted = row.isDeleted;
    this.authorUuid = row.authorUuid;
  }
}

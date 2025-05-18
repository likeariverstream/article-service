import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArticleParams } from './interfaces/update-article';
import { ArticleFilter, ArticleList } from './interfaces/article';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  async create(article: Article): Promise<Article> {
    return this.repository.save(article);
  }

  async findOneByUuid(uuid: string): Promise<Article | null> {
    return this.repository.findOneBy({
      uuid: uuid,
    });
  }

  async removeByUuid(uuid: string) {
    return this.repository.update({ uuid: uuid }, { isDeleted: true });
  }

  async update(updateData: UpdateArticleParams): Promise<Article | null> {
    await this.repository.save(updateData);

    return this.repository.findOneBy({ uuid: updateData.uuid });
  }

  async findManyByFilter(filter: ArticleFilter): Promise<ArticleList> {
    const query = this.repository.createQueryBuilder('article');
    query.where('article.is_deleted = :isDeleted', { isDeleted: false });

    if (filter.author) {
      query.andWhere('article.author_uuid = :author', {
        author: filter.author,
      });
    }

    if (filter.date) {
      query.andWhere('DATE(article.published_at) = :date', {
        date: filter.date,
      });
    }
    query.select([
      'article.uuid',
      'article.authorUuid',
      'article.title',
      'article.description',
      'article.publishedAt',
      'article.updatedAt',
    ]);
    query.limit(filter.limit);
    query.offset((filter.page - 1) * filter.limit);
    const totalCount = await query.getCount();
    const articles = await query.getMany();
    return {
      articles: articles,
      pages: Math.ceil(totalCount / filter.limit),
    };
  }
}

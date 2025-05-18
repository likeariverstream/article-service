import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArticle } from './interfaces/update-article';
import { FilterArticles } from './interfaces/filter-articles';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {
  }

  create(article: Article) {
    return this.repository.save(article);
  }

  findOneByUuid(uuid: string): Promise<Article> {
    return this.repository.findOneByOrFail({
      uuid: uuid,
    });
  }

  async removeByUuid(uuid: string) {
    const { affected } = await this.repository.update(
      { uuid: uuid },
      { isDeleted: true },
    );
    return { deleted: affected };
  }

  async update(updateData: UpdateArticle) {
    await this.repository.save(updateData);

    return this.repository.findOneByOrFail({ uuid: updateData.uuid });
  }

  async findManyByFilter(filter: FilterArticles) {
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

    query.limit(filter.limit);
    query.offset((filter.page - 1) * filter.limit);
    const totalCount = await query.getCount();
    const articles = await query.getMany();
    return {
      articles: articles,
      totalPages: Math.ceil(totalCount / filter.limit),
    };
  }
}

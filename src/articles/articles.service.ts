import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticle } from './interfaces/create-article';
import { Article } from './entities/article.entity';
import { UpdateArticle } from './interfaces/update-article';
import { FilterArticles } from './interfaces/filter-articles';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticlesRepository,
    private readonly cacheService: CacheService,
  ) {}

  createArticle(article: CreateArticle) {
    const articleData: Article = {
      authorUuid: article.authorUuid,
      title: article.title,
      description: article.description,
      publishedAt: new Date(),
      updatedAt: null,
      isDeleted: false,
    };

    return this.articleRepository.create(articleData);
  }

  async updateArticle(article: UpdateArticle) {
    await this.cacheService.delete(article.uuid);
    return this.articleRepository.update({ ...article, updatedAt: new Date() });
  }

  async getArticleByUuid(uuid: string) {
    let article = await this.cacheService.get(uuid);

    if (!article) {
      article = await this.articleRepository.findOneByUuid(uuid);
      await this.cacheService.set(uuid, article);
    }

    return article;
  }

  async deleteArticle(articleUuid: string) {
    await this.cacheService.delete(articleUuid);
    return this.articleRepository.removeByUuid(articleUuid);
  }

  async getArticlesByFilter(filter: FilterArticles) {
    const { articles, totalPages } =
      await this.articleRepository.findManyByFilter(filter);

    return { articles: articles, pages: totalPages };
  }
}

import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticle } from './interfaces/create-article';
import { Article } from './entities/article.entity';
import { UpdateArticle } from './interfaces/update-article';
import { FilterArticles } from './interfaces/filter-articles';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticlesRepository) {}

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

  updateArticle(article: UpdateArticle) {
    return this.articleRepository.update({ ...article, updatedAt: new Date() });
  }

  getArticleByUuid(uuid: string) {
    return this.articleRepository.findOneByUuid(uuid);
  }

  deleteArticle(articleUuid: string) {
    return this.articleRepository.removeByUuid(articleUuid);
  }

  async getArticlesByFilter(filter: FilterArticles) {
    const { articles, totalCount } =
      await this.articleRepository.findManyByFilter(filter);
    return { articles: articles, total: totalCount };
  }
}

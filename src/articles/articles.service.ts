import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleParams } from './interfaces/create-article';
import {
  UpdateArticleParams,
  UpdatedArticle,
} from './interfaces/update-article';
import { ArticleData, ArticleFilter, ArticleList } from './interfaces/article';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticlesRepository,
    private readonly cacheService: CacheService,
  ) {}

  async createArticle(article: CreateArticleParams): Promise<ArticleData> {
    const articleData = {
      authorUuid: article.authorUuid,
      title: article.title,
      description: article.description,
      publishedAt: new Date(),
      updatedAt: null,
      isDeleted: false,
    };
    const result = await this.articleRepository.create(articleData);
    return {
      uuid: result.uuid,
      authorUuid: result.authorUuid,
      title: result.title,
      description: result.description,
      publishedAt: result.publishedAt,
      updatedAt: result.updatedAt,
    };
  }

  async updateArticle(article: UpdateArticleParams): Promise<UpdatedArticle> {
    const foundArticle = await this.articleRepository.findOneByUuid(
      article.uuid,
    );
    if (!foundArticle) {
      throw new NotFoundException('Article not found');
    }

    const updatedArticle = await this.articleRepository.update({
      ...article,
      updatedAt: new Date(),
    });

    if (!updatedArticle) {
      throw new UnprocessableEntityException('Article update failed');
    }

    await this.cacheService.delete(article.uuid);
    return {
      authorUuid: updatedArticle.authorUuid,
      publishedAt: updatedArticle.publishedAt,
      updatedAt: updatedArticle.updatedAt,
      uuid: updatedArticle.uuid,
      title: updatedArticle.title,
      description: updatedArticle.description,
    };
  }

  async getArticleByUuid(uuid: string): Promise<ArticleData> {
    let article = await this.cacheService.get<ArticleData | null>(uuid);

    if (!article) {
      article = await this.articleRepository.findOneByUuid(uuid);
      if (!article) {
        throw new NotFoundException('Article not found');
      }
      await this.cacheService.set(uuid, article);
    }

    return article;
  }

  async deleteArticle(articleUuid: string): Promise<{ success: boolean }> {
    const article = await this.articleRepository.findOneByUuid(articleUuid);
    if (!article) {
      throw new NotFoundException('Article does not exist');
    }

    if (article.isDeleted) {
      throw new NotFoundException('Article has been deleted');
    }

    await this.cacheService.delete(articleUuid);
    const result = await this.articleRepository.removeByUuid(articleUuid);

    return { success: !!result.affected };
  }

  async getArticlesByFilter(filter: ArticleFilter): Promise<ArticleList> {
    const { articles, pages } =
      await this.articleRepository.findManyByFilter(filter);

    return { articles: articles, pages: pages };
  }
}

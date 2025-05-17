import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticlesRepository) {}

  createArticle() {}
}

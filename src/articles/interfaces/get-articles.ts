import { Article } from '../entities/article.entity';

export interface GetArticles {
  articles: Article[];
  totalCount: number;
}

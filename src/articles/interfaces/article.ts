export interface ArticleFilter {
  page: number;
  limit: number;
  author: string;
  date: string;
}

export interface ArticleData {
  uuid?: string;
  title: string;
  description: string;
  authorUuid: string;
  publishedAt: string | Date;
  updatedAt: string | Date | null;
}

export interface ArticleList {
  articles: ArticleData[];
  pages: number;
}

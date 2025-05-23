export interface ArticleFilter {
  page: number;
  limit: number;
  author?: string;
  date?: string;
}

export interface ArticleData {
  uuid?: string;
  title: string;
  description: string;
  authorUuid: string;
  publishedAt: string;
  updatedAt: string | null;
}

export interface ArticleList {
  articles: ArticleData[];
  pages: number;
}

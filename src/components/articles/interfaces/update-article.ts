export interface UpdateArticleParams {
  uuid: string;
  title?: string;
  description?: string;
  updatedAt?: string;
}

export interface UpdatedArticle {
  uuid?: string;
  title: string;
  description: string;
  authorUuid: string;
  publishedAt: string;
  updatedAt: string | null;
}

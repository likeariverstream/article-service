export interface UpdateArticleParams {
  uuid: string;
  title?: string;
  description?: string;
  updatedAt?: Date;
}

export interface UpdatedArticle {
  uuid?: string;
  title: string;
  description: string;
  authorUuid: string;
  publishedAt: string | Date;
  updatedAt: string | Date | null;
}

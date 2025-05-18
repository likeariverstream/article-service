export interface CreateArticleParams {
  authorUuid: string;
  title: string;
  description: string;
}

export interface CreatedArticle {
  uuid: string;
  title: string;
  description: string;
  authorUuid: string;
  publishedAt: string;
  updatedAt: string | null;
}

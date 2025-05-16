import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';

@Module({
  controllers: [AbortController],
  providers: [ArticleService],
})
export class ArticlesModule {}

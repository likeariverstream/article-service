import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesRepository } from './articles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticleService, ArticlesRepository],
})
export class ArticlesModule {}

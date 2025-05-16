import { Controller } from '@nestjs/common';
import { ArticleService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}
}

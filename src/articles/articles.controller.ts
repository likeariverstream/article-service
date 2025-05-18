import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './articles.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { Session } from '../users/interfaces/session';
import { AuthUser } from '../decorators/auth-user';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetListQueryDto } from './dto/get-list-query.dto';
import { UpdateArticleParamsDto } from './dto/update-article-params.dto';
import { GetArticleParamsDto } from './dto/get-article-params.dto';
import { DeleteArticleParamsDto } from './dto/delete-article-params.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  createArticle(@Body() article: CreateArticleDto, @AuthUser() user: Session) {
    return this.articleService.createArticle({
      ...article,
      authorUuid: user.uuid,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':articleUuid')
  updateArticle(
    @Param() params: UpdateArticleParamsDto,
    @Body() article: UpdateArticleDto,
  ) {
    const { articleUuid } = params;
    return this.articleService.updateArticle({ ...article, uuid: articleUuid });
  }

  @UseGuards(AuthGuard)
  @Delete(':articleUuid')
  deleteArticle(@Param() params: DeleteArticleParamsDto) {
    const { articleUuid } = params;
    return this.articleService.deleteArticle(articleUuid);
  }

  @Get(':articleUuid')
  getArticle(@Param() params: GetArticleParamsDto) {
    const { articleUuid } = params;
    return this.articleService.getArticleByUuid(articleUuid);
  }

  @Get()
  getList(@Query() query: GetListQueryDto) {
    const { offset = 0, limit = 20, author, date } = query;
    const filter = {
      offset,
      limit,
      author,
      date,
    };
    return this.articleService.getArticlesByFilter(filter);
  }
}

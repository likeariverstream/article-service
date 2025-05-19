import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../../guards/auth.guard';
import {
  CreateArticleResDto,
  CreateArticleReqDto,
} from './dto/create-article.dto';
import { Session } from '../users/interfaces/session';
import { AuthUser } from '../../decorators/auth-user';
import {
  UpdateArticleParamsDto,
  UpdateArticleReqDto,
  UpdateArticleResDto,
} from './dto/update-article.dto';
import {
  GetArticleListQueryDto,
  GetArticleListResDto,
} from './dto/get-article-list';
import { GetArticleParamsDto, GetArticleResDto } from './dto/get-article.dto';
import {
  DeleteArticleParamsDto,
  DeleteArticleResDto,
} from './dto/delete-article.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: CreateArticleResDto, status: HttpStatus.CREATED })
  @UseGuards(AuthGuard)
  @Post()
  createArticle(
    @Body() article: CreateArticleReqDto,
    @AuthUser() user: Session,
  ) {
    return this.articlesService.createArticle({
      ...article,
      authorUuid: user.uuid,
    });
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateArticleResDto })
  @UseGuards(AuthGuard)
  @Patch(':articleUuid')
  updateArticle(
    @Param() params: UpdateArticleParamsDto,
    @Body() article: UpdateArticleReqDto,
  ) {
    const { articleUuid } = params;
    return this.articlesService.updateArticle({
      ...article,
      uuid: articleUuid,
    });
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteArticleResDto })
  @UseGuards(AuthGuard)
  @Delete(':articleUuid')
  deleteArticle(
    @Param() params: DeleteArticleParamsDto,
  ): Promise<DeleteArticleResDto> {
    const { articleUuid } = params;
    return this.articlesService.deleteArticle(articleUuid);
  }

  @ApiOkResponse({ type: GetArticleResDto })
  @Get(':articleUuid')
  getArticle(@Param() params: GetArticleParamsDto) {
    const { articleUuid } = params;
    return this.articlesService.getArticleByUuid(articleUuid);
  }

  @ApiOkResponse({ type: GetArticleListResDto })
  @Get()
  getList(@Query() query: GetArticleListQueryDto) {
    const { page = 1, limit = 20, author, date } = query;
    const filter = {
      page,
      limit,
      author,
      date,
    };
    return this.articlesService.getArticlesByFilter(filter);
  }
}

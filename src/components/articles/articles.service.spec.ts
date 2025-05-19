import { ArticlesService } from './articles.service';
import { JwtModule } from '@nestjs/jwt';
import { CacheService } from '../../cache/cache.service';
import { ArticlesRepository } from './articles.repository';
import { AppConfigModule } from '../../config/app-config.module';
import { CacheModule } from '../../cache/cache.module';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { Article } from './entities/article.entity';
import { UpdateResult } from 'typeorm';
import { ArticleFilter, ArticleList } from './interfaces/article';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let cacheService: CacheService;
  let articlesRepository: ArticlesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, AppConfigModule, CacheModule],
      providers: [
        ArticlesService,
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ArticlesRepository,
          useValue: {
            create: jest.fn(),
            findOneByUuid: jest.fn(),
            removeByUuid: jest.fn(),
            update: jest.fn(),
            findManyByFilter: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<ArticlesService>(ArticlesService);
    articlesRepository = module.get(ArticlesRepository);
    cacheService = module.get(CacheService);
  });

  it('should be create article', async () => {
    const authorUuid = randomUUID();
    const articleUuid = randomUUID();
    const publishedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const createArticleParams = {
      authorUuid: authorUuid,
      title: 'Article Title',
      description: 'Article Description',
    };

    const articleData = {
      authorUuid: createArticleParams.title,
      title: createArticleParams.title,
      description: createArticleParams.description,
      publishedAt: publishedAt,
      updatedAt: null,
      isDeleted: false,
    };
    const mockArticle: Article = {
      uuid: articleUuid,
      authorUuid: authorUuid,
      title: createArticleParams.title,
      description: createArticleParams.description,
      publishedAt: publishedAt,
      createdAt: createdAt,
      updatedAt: null,
      isDeleted: false,
    };

    jest.spyOn(articlesRepository, 'create').mockResolvedValue(mockArticle);

    const result = await service.createArticle(articleData);

    expect(result).toEqual({
      uuid: articleUuid,
      authorUuid: authorUuid,
      title: createArticleParams.title,
      description: createArticleParams.description,
      publishedAt: publishedAt,
      updatedAt: null,
    });
  });

  it('should be update article', async () => {
    const articleUuid = randomUUID();
    const authorUuid = randomUUID();
    const publishedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const updateArticleParams = {
      uuid: articleUuid,
      title: 'Article Title 1',
      description: 'Article Description 1',
    };
    const mockArticle: Article = {
      uuid: articleUuid,
      authorUuid: authorUuid,
      title: updateArticleParams.title,
      description: updateArticleParams.description,
      publishedAt: publishedAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      isDeleted: false,
    };

    jest
      .spyOn(articlesRepository, 'findOneByUuid')
      .mockResolvedValue(mockArticle);
    jest.spyOn(articlesRepository, 'update').mockResolvedValue(mockArticle);

    const result = await service.updateArticle(updateArticleParams);

    const expected = {
      authorUuid: mockArticle.authorUuid,
      publishedAt: mockArticle.publishedAt,
      updatedAt: mockArticle.updatedAt,
      uuid: mockArticle.uuid,
      title: mockArticle.title,
      description: mockArticle.description,
    };

    expect(result).toEqual(expected);
  });

  it('should be return article by uuid', async () => {
    const articleUuid = randomUUID();
    const authorUuid = randomUUID();
    const publishedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const mockArticle: Article = {
      uuid: articleUuid,
      authorUuid: authorUuid,
      title: 'Article Title 2',
      description: 'Article Description 2',
      publishedAt: publishedAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      isDeleted: false,
    };

    const expected = {
      uuid: articleUuid,
      title: mockArticle.title,
      description: mockArticle.description,
      authorUuid: mockArticle.authorUuid,
      publishedAt: mockArticle.publishedAt,
      updatedAt: mockArticle.updatedAt,
    };

    jest.spyOn(cacheService, 'get').mockResolvedValue(undefined);
    jest
      .spyOn(articlesRepository, 'findOneByUuid')
      .mockResolvedValue(mockArticle);

    const result = await service.getArticleByUuid(articleUuid);
    expect(result).toEqual(expected);
  });

  it('should be delete article by uuid', async () => {
    const articleUuid = randomUUID();
    const authorUuid = randomUUID();
    const publishedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const mockArticle: Article = {
      uuid: articleUuid,
      authorUuid: authorUuid,
      title: 'Article Title 2',
      description: 'Article Description 2',
      publishedAt: publishedAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      isDeleted: false,
    };
    const updateResult: UpdateResult = {
      affected: 1,
      raw: '',
      generatedMaps: [{}],
    };
    const expected = { success: true };
    jest
      .spyOn(articlesRepository, 'findOneByUuid')
      .mockResolvedValue(mockArticle);
    jest
      .spyOn(articlesRepository, 'removeByUuid')
      .mockResolvedValue(updateResult);

    const result = await service.deleteArticle(articleUuid);

    expect(result).toEqual(expected);
  });

  it('should be return articles list by filter', async () => {
    const authorUuid = randomUUID();
    const articleUuid1 = randomUUID();
    const articleUuid2 = randomUUID();

    const filter: ArticleFilter = {
      author: authorUuid,
      date: '2025-12-31',
      page: 1,
      limit: 2,
    };

    const mockArticleList: ArticleList = {
      articles: [
        {
          uuid: articleUuid1,
          title: 'Article 1',
          description: 'Article description 1',
          authorUuid: authorUuid,
          publishedAt: new Date().toISOString(),
          updatedAt: null,
        },
        {
          uuid: articleUuid2,
          title: 'Article 2',
          description: 'Article description 2',
          authorUuid: authorUuid,
          publishedAt: new Date().toISOString(),
          updatedAt: null,
        },
      ],
      pages: 10,
    };

    jest
      .spyOn(articlesRepository, 'findManyByFilter')
      .mockResolvedValue(mockArticleList);
    const result = await service.getArticlesByFilter(filter);

    expect(result).toEqual(mockArticleList);
  });

  it('should be return articles list by filter without date', async () => {
    const authorUuid = randomUUID();
    const articleUuid1 = randomUUID();
    const articleUuid2 = randomUUID();
    const filter: ArticleFilter = {
      author: authorUuid,
      page: 1,
      limit: 2,
    };

    const mockArticleList: ArticleList = {
      articles: [
        {
          uuid: articleUuid1,
          title: 'Article 1',
          description: 'Article description 1',
          authorUuid: authorUuid,
          publishedAt: '2025-05-18T04:50:26.296Z',
          updatedAt: null,
        },
        {
          uuid: articleUuid2,
          title: 'Article 2',
          description: 'Article description 2',
          authorUuid: authorUuid,
          publishedAt: '2025-05-12T04:50:26.296Z',
          updatedAt: null,
        },
      ],
      pages: 10,
    };

    jest
      .spyOn(articlesRepository, 'findManyByFilter')
      .mockResolvedValue(mockArticleList);
    const result = await service.getArticlesByFilter(filter);

    expect(result).toEqual(mockArticleList);
  });

  it('should be return articles list by filter without author', async () => {
    const authorUuid1 = randomUUID();
    const authorUuid2 = randomUUID();
    const articleUuid1 = randomUUID();
    const articleUuid2 = randomUUID();

    const filter: ArticleFilter = {
      page: 1,
      limit: 2,
      date: '2025-05-12',
    };

    const mockArticleList: ArticleList = {
      articles: [
        {
          uuid: articleUuid1,
          title: 'Article 1',
          description: 'Article description 1',
          authorUuid: authorUuid1,
          publishedAt: '2025-05-12T04:50:26.296Z',
          updatedAt: null,
        },
        {
          uuid: articleUuid2,
          title: 'Article 2',
          description: 'Article description 2',
          authorUuid: authorUuid2,
          publishedAt: '2025-05-12T09:52:24.291Z',
          updatedAt: null,
        },
      ],
      pages: 10,
    };

    jest
      .spyOn(articlesRepository, 'findManyByFilter')
      .mockResolvedValue(mockArticleList);
    const result = await service.getArticlesByFilter(filter);

    expect(result).toEqual(mockArticleList);
  });
});

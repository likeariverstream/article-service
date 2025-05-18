import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const getArticleListQueryZ = extendApi(
  z.object({
    limit: z.coerce.number().gte(1).max(100),
    page: z.coerce.number().gte(1),
    author: z.string().uuid(),
    date: extendApi(z.string(), { example: '2025-05-31' }),
  }),
);

const getArticleListResDto = extendApi(
  z.object({
    articles: z.array(
      z.object({
        uuid: z.string().uuid(),
        authorUuid: z.string().uuid(),
        title: z.string().min(2).max(255),
        description: z.string().min(2).max(2000),
        publishedAt: z.date(),
        updatedAt: z.date().nullable(),
      }),
    ),
    pages: z.number(),
  }),
);

export class GetArticleListQueryDto extends createZodDto(
  getArticleListQueryZ,
) {}
export class GetArticleListResDto extends createZodDto(getArticleListResDto) {}

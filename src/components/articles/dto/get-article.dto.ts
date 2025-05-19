import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const getArticleParamsZ = extendApi(
  z.object({ articleUuid: z.string().uuid() }),
);

const getArticleResDto = extendApi(
  z.object({
    uuid: z.string().uuid(),
    authorUuid: z.string().uuid(),
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
    publishedAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

export class GetArticleParamsDto extends createZodDto(getArticleParamsZ) {}
export class GetArticleResDto extends createZodDto(getArticleResDto) {}

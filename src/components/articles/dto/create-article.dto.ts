import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const createArticleReqZ = extendApi(
  z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
  }),
);

const createArticleResZ = extendApi(
  z.object({
    uuid: z.string().uuid(),
    authorUuid: z.string().uuid(),
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
    publishedAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

export class CreateArticleReqDto extends createZodDto(createArticleReqZ) {}
export class CreateArticleResDto extends createZodDto(createArticleResZ) {}

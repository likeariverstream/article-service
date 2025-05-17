import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const createArticleZ = extendApi(
  z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
  }),
);

export class CreateArticleDto extends createZodDto(createArticleZ) {}

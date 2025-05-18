import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const updateArticleZ = extendApi(
  z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
  }),
);

export class UpdateArticleDto extends createZodDto(updateArticleZ) {}

import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

const updateArticleResZ = extendApi(
  z.object({
    uuid: z.string().uuid(),
    authorUuid: z.string().uuid(),
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(2000),
    publishedAt: z.date(),
    updatedAt: z.date().nullable(),
  }),
);

const updateArticleReqZ = extendApi(
  z.object({
    title: z.string().min(2).max(255).optional(),
    description: z.string().min(2).max(2000).optional(),
  }),
);

const updateArticleParamsZ = extendApi(
  z.object({ articleUuid: z.string().uuid() }),
);

export class UpdateArticleReqDto extends createZodDto(updateArticleReqZ) {}
export class UpdateArticleResDto extends createZodDto(updateArticleResZ) {}
export class UpdateArticleParamsDto extends createZodDto(
  updateArticleParamsZ,
) {}

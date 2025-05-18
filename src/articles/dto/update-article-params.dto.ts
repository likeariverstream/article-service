import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const updateArticleParamsZ = extendApi(
  z.object({ articleUuid: z.string().uuid() }),
);

export class UpdateArticleParamsDto extends createZodDto(
  updateArticleParamsZ,
) {}

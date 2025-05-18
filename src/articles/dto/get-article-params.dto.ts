import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const getArticleParamsZ = extendApi(
  z.object({ articleUuid: z.string().uuid() }),
);

export class GetArticleParamsDto extends createZodDto(getArticleParamsZ) {}

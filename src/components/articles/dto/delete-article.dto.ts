import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const deleteArticleParamsZ = extendApi(
  z.object({ articleUuid: z.string().uuid() }),
);

const deleteArticleResZ = extendApi(z.object({ success: z.boolean() }), {});

export class DeleteArticleParamsDto extends createZodDto(
  deleteArticleParamsZ,
) {}

export class DeleteArticleResDto extends createZodDto(deleteArticleResZ) {}

import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const getListQueryZ = extendApi(
  z.object({
    limit: z.coerce.number().gte(1).max(100),
    page: z.coerce.number().gte(1),
    author: z.string().uuid(),
    date: extendApi(z.date(), { example: '2025-05-31' }),
  }),
);

export class GetListQueryDto extends createZodDto(getListQueryZ) {}

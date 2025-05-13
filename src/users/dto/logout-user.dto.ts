import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const logoutUserZ = extendApi(
  z.object({
    uuid: z.string().uuid().nonempty(),
  }),
);

export class LogoutUserDto extends createZodDto(logoutUserZ) {}

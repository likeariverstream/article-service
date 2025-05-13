import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const loginUserZ = extendApi(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  }),
);

export class LoginUserDto extends createZodDto(loginUserZ) {}

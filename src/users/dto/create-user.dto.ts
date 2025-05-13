import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const createUserZ = extendApi(
  z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().min(2).email(),
    password: z.string().min(8),
  }),
);

export class CreateUserDto extends createZodDto(createUserZ) {}

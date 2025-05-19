import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const createUserReqZ = extendApi(
  z.object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().min(2).email(),
    password: z.string().min(8),
  }),
);

const createUserResZ = extendApi(
  z.object({
    uuid: z.string().uuid(),
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().min(2).email(),
    createdAt: z.string().optional().or(z.date()),
    updatedAt: z.string().or(z.date()).nullable(),
  }),
);

export class CreateUserReqDto extends createZodDto(createUserReqZ) {}

export class CreateUserResDto extends createZodDto(createUserResZ) {}

import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const loginUserReqZ = extendApi(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  }),
);

const loginUserResZ = extendApi(
  z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
);

export class LoginUserReqDto extends createZodDto(loginUserReqZ) {}
export class LoginUserResDto extends createZodDto(loginUserResZ) {}

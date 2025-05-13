import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z } from 'zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) =>
        z
          .object({
            APP_PORT: z.coerce.number({ required_error: 'APP_PORT not found' }),
            AUTH_PASSWORD_KEY: z.string({
              required_error: 'AUTH_PASSWORD_KEY not found',
            }),
            AUTH_ACCESS_TOKEN_KEY: z.string({
              required_error: 'AUTH_ACCESS_TOKEN_KEY not found',
            }),
            AUTH_REFRESH_TOKEN_KEY: z.string({
              required_error: 'AUTH_REFRESH_TOKEN_KEY not found',
            }),
          })
          .parse(env),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}

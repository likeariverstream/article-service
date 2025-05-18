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
            POSTGRES_HOST: z.string({ required_error: 'POSTGRES_HOST' }),
            POSTGRES_PORT: z.coerce.number({ required_error: 'POSTGRES_PORT' }),
            POSTGRES_PASSWORD: z.string({
              required_error: 'POSTGRES_PASSWORD',
            }),
            POSTGRES_USERNAME: z.string({
              required_error: 'POSTGRES_USERNAME',
            }),
            POSTGRES_DATABASE: z.string({
              required_error: 'POSTGRES_DATABASE',
            }),
            ADMINER_PORT: z.coerce.number({ required_error: 'ADMINER_PORT' }),
            REDIS_PASSWORD: z.string({
              required_error: 'REDIS_PASSWORD not found',
            }),
            REDIS_PORT: z.coerce.number({
              required_error: 'REDIS_PORT not found',
            }),
            REDIS_HOST: z.string({
              required_error: 'REDIS_HOST not found',
            }),
            REDIS_USERNAME: z.string({
              required_error: 'REDIS_USERNAME not found',
            }),
            REDIS_TTL: z.string({
              required_error: 'REDIS_TTL not found',
            }),
          })
          .parse(env),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}

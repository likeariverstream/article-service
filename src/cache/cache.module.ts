import { Module } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { Cacheable } from 'cacheable';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: 'CACHE_INSTANCE',
      useFactory: (config: ConfigService) => {
        const REDIS_PORT = config.get<number>('REDIS_PORT');
        const REDIS_PASSWORD = config.get<string>('REDIS_PASSWORD');
        const REDIS_HOST = config.get<string>('REDIS_HOST');
        const REDIS_USERNAME = config.get<string>('REDIS_USERNAME');
        const REDIS_TTL = config.get<string>('REDIS_TTL');

        const secondary = new Keyv({
          store: new KeyvRedis(
            `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
          ),
          namespace: 'cache-namespace',
          useKeyPrefix: false,
        });

        return new Cacheable({ secondary, ttl: REDIS_TTL });
      },
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}

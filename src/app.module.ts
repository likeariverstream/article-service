import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ArticlesModule } from './components/articles/articles.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    UsersModule,
    AppConfigModule,
    DatabaseModule,
    ArticlesModule,
    CacheModule,
  ],
})
export class AppModule {}

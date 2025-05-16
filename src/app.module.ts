import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [UsersModule, AppConfigModule, DatabaseModule, ArticlesModule],
})
export class AppModule {}

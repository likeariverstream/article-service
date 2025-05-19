import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesRepository } from './articles.repository';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../../config/app-config.module';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    JwtModule,
    AppConfigModule,
    CacheModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}

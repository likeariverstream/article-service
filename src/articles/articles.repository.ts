import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  create(article: Article) {
    return this.repository.create(article);
  }

  findOneByUuid(uuid: string): Promise<Article> {
    return this.repository.findOneByOrFail({
      uuid: uuid,
    });
  }

  remove(uuid: string) {
    return this.repository.update({ uuid: uuid }, { isDeleted: true });
  }

  update(updateData: Article) {
    return this.repository.preload(updateData);
  }

  getList(offset: number, limit: number): Promise<Article[]> {
    return this.repository.find({ skip: offset, take: limit });
  }
}

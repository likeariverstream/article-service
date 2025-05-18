import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: User) {
    return await this.repository.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOneBy({
      email,
    });
  }

  findOneByEmailAndPassword(email: string, hashPassword: string) {
    return this.repository.findOneByOrFail({
      email: email,
      hashPassword: hashPassword,
    });
  }

  async update(user: User) {
    await this.repository.update({ uuid: user.uuid }, user);

    return await this.repository.findOneBy({ uuid: user.uuid });
  }
}

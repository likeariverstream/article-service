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

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findOneByUuid(uuid: string): Promise<User | null> {
    return this.repository.findOneBy({ uuid: uuid, isDeleted: false });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({
      email,
      isDeleted: false,
    });
  }

  findOneByEmailAndPassword(
    email: string,
    hashPassword: string,
  ): Promise<User | null> {
    return this.repository.findOneBy({
      email: email,
      hashPassword: hashPassword,
      isDeleted: false,
    });
  }

  async update(user: User): Promise<User | null> {
    await this.repository.update({ uuid: user.uuid }, user);

    return await this.repository.findOneBy({ uuid: user.uuid });
  }
}

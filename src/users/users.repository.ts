import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly repository: Repository<User>) {}

  async create(user: User) {
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async update(user: User) {}
}

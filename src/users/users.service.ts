import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { sha256 } from '../helpers/sha-256';
import { LoginUserDto } from './dto/login-user.dto';
import { Session } from './interfaces/session';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {}

  createUser(userData: CreateUserDto) {
    const { name, surname, email, password } = userData;
    const hashPassword = sha256(password);
    return this.usersRepository.create({
      name: name,
      surname: surname,
      email: email,
      hashPassword: hashPassword,
      refreshToken: null,
      updatedAt: null,
      isDeleted: false,
    });
  }

  async checkByEmailAndPassword(userData: LoginUserDto) {
    const { email, password } = userData;
    const hashPassword = sha256(password);
    return await this.usersRepository.findOneByEmailAndPassword(
      email,
      hashPassword,
    );
  }

  getTokenPair(session: Session) {
    const AUTH_ACCESS_TOKEN_KEY = this.configService.get<string>(
      'AUTH_ACCESS_TOKEN_KEY',
    );
    const AUTH_REFRESH_TOKEN_KEY = this.configService.get<string>(
      'AUTH_REFRESH_TOKEN_KEY',
    );

    const accessToken = this.jwtService.sign(session, {
      secret: AUTH_ACCESS_TOKEN_KEY,
      expiresIn: '7d',
    });
    const refreshToken = this.jwtService.sign(session, {
      secret: AUTH_REFRESH_TOKEN_KEY,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async updateUser(user: User) {
    return await this.usersRepository.update(user);
  }

  async checkByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }
}

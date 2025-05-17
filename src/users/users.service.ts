import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { sha256 } from '../helpers/sha-256';
import { LoginUserDto } from './dto/login-user.dto';
import { Session } from './interfaces/session';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {}

  create(userData: CreateUserDto) {
    const { name, surname, email, password } = userData;
    const hashPassword = sha256(password);

    return { name, surname, email, hashPassword };
  }

  checkByEmailAndPassword(userData: LoginUserDto) {
    const { email, password } = userData;
    const hashPassword = sha256(password);

    return { email, hashPassword };
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
}

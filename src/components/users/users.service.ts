import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user.dto';
import { sha256 } from '../../helpers/sha-256';
import { LoginUserReqDto } from './dto/login-user.dto';
import { Session } from './interfaces/session';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserData } from './interfaces/user';
import { TokenPair } from './interfaces/token';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(userData: CreateUserReqDto): Promise<UserData> {
    const { name, surname, email, password } = userData;
    const hashPassword = sha256(password);
    const createdUser = await this.usersRepository.create({
      name: name,
      surname: surname,
      email: email,
      hashPassword: hashPassword,
      refreshToken: null,
      updatedAt: null,
      isDeleted: false,
    });

    if (!createdUser.uuid) {
      throw new UnprocessableEntityException('User creation failed');
    }

    const user = await this.usersRepository.findOneByUuid(createdUser.uuid);

    if (!user?.uuid) {
      throw new NotFoundException('User not found');
    }

    return {
      uuid: user.uuid,
      email: user.email,
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async checkByEmailAndPassword(
    userData: LoginUserReqDto,
  ): Promise<User | null> {
    const { email, password } = userData;
    const hashPassword = sha256(password);
    return await this.usersRepository.findOneByEmailAndPassword(
      email,
      hashPassword,
    );
  }

  getTokenPair(session: Session): TokenPair {
    const AUTH_ACCESS_TOKEN_KEY = this.configService.get<string>(
      'AUTH_ACCESS_TOKEN_KEY',
    );
    const AUTH_REFRESH_TOKEN_KEY = this.configService.get<string>(
      'AUTH_REFRESH_TOKEN_KEY',
    );

    const accessToken = this.jwtService.sign(session, {
      secret: AUTH_ACCESS_TOKEN_KEY,
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(session, {
      secret: AUTH_REFRESH_TOKEN_KEY,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async updateUser(user: User): Promise<User | null> {
    return await this.usersRepository.update(user);
  }

  async checkByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneByEmail(email);
  }
}

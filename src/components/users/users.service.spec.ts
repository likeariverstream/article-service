import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserReqDto } from './dto/create-user.dto';
import { sha256 } from '../../helpers/sha-256';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Session } from './interfaces/session';
import { AppConfigModule } from '../../config/app-config.module';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token';
import { LoginUserReqDto } from './dto/login-user.dto';
import { UsersRepository } from './users.repository';
import { randomUUID } from 'node:crypto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, AppConfigModule],
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOneByUuid: jest.fn(),
            findOneByEmail: jest.fn(),
            findOneByEmailAndPassword: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get(ConfigService);
    usersRepository = module.get(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user', async () => {
    const userData: CreateUserReqDto = {
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com',
      password: '12345678',
    };
    const hashPassword = sha256(userData.password);
    const userUuid = randomUUID();
    const createdAt = new Date().toISOString();
    const createdUserData: User = {
      uuid: userUuid,
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com.ru',
      hashPassword: hashPassword,
      refreshToken: null,
      updatedAt: null,
      isDeleted: false,
    };

    const mockUser: User = {
      uuid: userUuid,
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com.ru',
      hashPassword: hashPassword,
      updatedAt: null,
      isDeleted: false,
      refreshToken: 'refreshToken',
      createdAt: createdAt,
    };

    jest.spyOn(usersRepository, 'create').mockResolvedValue(createdUserData);
    jest.spyOn(usersRepository, 'findOneByUuid').mockResolvedValue(mockUser);
    const createdUser = await service.createUser(userData);

    expect(createdUser).toStrictEqual({
      uuid: userUuid,
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com.ru',
      updatedAt: null,
      createdAt: createdAt,
    });
  });

  it('should be return user', async () => {
    const loginData: LoginUserReqDto = {
      email: 'example@mail.com.ru',
      password: '12345678',
    };
    const hashPassword = sha256(loginData.password);
    const userUuid = randomUUID();
    const createdAt = new Date().toISOString();
    const mockUser: User = {
      uuid: userUuid,
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com.ru',
      hashPassword: hashPassword,
      updatedAt: null,
      isDeleted: false,
      refreshToken: 'refreshToken',
      createdAt: createdAt,
    };

    jest
      .spyOn(usersRepository, 'findOneByEmailAndPassword')
      .mockResolvedValue(mockUser);

    const expected = await service.checkByEmailAndPassword(loginData);

    expect(expected).toStrictEqual(mockUser);
  });

  it('should be corrected fields decode', () => {
    const session: Session = {
      name: 'John',
      surname: 'Doe',
      uuid: '1',
      email: 'example@mail.com',
    };

    const AUTH_ACCESS_TOKEN_KEY = configService.get<string>(
      'AUTH_ACCESS_TOKEN_KEY',
    );
    const AUTH_REFRESH_TOKEN_KEY = configService.get<string>(
      'AUTH_REFRESH_TOKEN_KEY',
    );

    const tokens = service.getTokenPair(session);

    const decodedAccessToken = jwtService.verify<TokenPayload>(
      tokens.accessToken,
      {
        secret: AUTH_ACCESS_TOKEN_KEY,
      },
    );

    const decodedRefreshToken = jwtService.verify<TokenPayload>(
      tokens.refreshToken,
      {
        secret: AUTH_REFRESH_TOKEN_KEY,
      },
    );

    expect(decodedAccessToken.uuid).toStrictEqual(session.uuid);
    expect(decodedAccessToken.email).toStrictEqual(session.email);
    expect(decodedAccessToken.name).toStrictEqual(session.name);
    expect(decodedAccessToken.surname).toStrictEqual(session.surname);

    expect(decodedRefreshToken.uuid).toStrictEqual(session.uuid);
    expect(decodedRefreshToken.email).toStrictEqual(session.email);
    expect(decodedRefreshToken.name).toStrictEqual(session.name);
    expect(decodedRefreshToken.surname).toStrictEqual(session.surname);
  });
});

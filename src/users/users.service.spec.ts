import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { sha256 } from '../helpers/sha-256';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Session } from './interfaces/session';
import { AppConfigModule } from '../config/app-config.module';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token';

describe('UsersService', () => {
  let service: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, AppConfigModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user', () => {
    const userData: CreateUserDto = {
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com',
      password: '12345678',
    };
    const hashPassword = sha256(userData.password);
    const createdUser = service.create(userData);

    expect(createdUser).toStrictEqual({
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com',
      hashPassword: hashPassword,
    });
  });

  it('should be return email and hash', () => {
    const loginData: LoginUserDto = {
      email: 'example@mail.com',
      password: '12345678',
    };
    const expected = service.checkByEmailAndPassword(loginData);

    expect(expected).toStrictEqual({
      email: loginData.email,
      hashPassword: sha256(loginData.password),
    });
  });

  it('should be corrected fields decode', () => {
    const session: Session = {
      name: 'John',
      surname: 'Doe',
      id: '1',
      email: 'example@mail.com',
      role: 'user',
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

    expect(decodedAccessToken.id).toStrictEqual(session.id);
    expect(decodedAccessToken.email).toStrictEqual(session.email);
    expect(decodedAccessToken.name).toStrictEqual(session.name);
    expect(decodedAccessToken.surname).toStrictEqual(session.surname);
    expect(decodedAccessToken.role).toStrictEqual(session.role);

    expect(decodedRefreshToken.id).toStrictEqual(session.id);
    expect(decodedRefreshToken.email).toStrictEqual(session.email);
    expect(decodedRefreshToken.name).toStrictEqual(session.name);
    expect(decodedRefreshToken.surname).toStrictEqual(session.surname);
    expect(decodedRefreshToken.role).toStrictEqual(session.role);
  });
});

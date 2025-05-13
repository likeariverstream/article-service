import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/register (POST) should create user', () => {
    const userDto: CreateUserDto = {
      name: 'John',
      surname: 'Doe',
      email: 'example@mail.com',
      password: '123456789',
    };

    return request(app.getHttpServer())
      .post('/users/register')
      .send(userDto)
      .expect(201)
      .expect((response) => {
        expect(response.body).toMatchObject({
          email: userDto.email,
          name: userDto.name,
          surname: userDto.surname,
        });
      });
  });
});

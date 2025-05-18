import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { HttpExceptionFilter } from './filters/exception-filter';
import { swagger } from './services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT');
  const mode = configService.get<string>('NODE_ENV');

  app.enableShutdownHooks();
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  swagger(app, mode);

  await app.listen(port ?? 4000);
}

bootstrap().catch((err) => console.log(err));

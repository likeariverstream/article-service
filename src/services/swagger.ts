import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { INestApplication } from '@nestjs/common';

export const swagger = (app: INestApplication, mode?: string) => {
  if (mode === 'production') {
    return;
  }
  const config = new DocumentBuilder()
    .setTitle('Article service API')
    .setDescription(
      "The service's API for creating, reading, editing, and deleting articles",
    )
    .setVersion('1.0')
    .addTag('Article service')
    .addBearerAuth({
      name: 'Authorization',
      type: 'http',
      in: 'header',
      description: 'Enter your access token (without "Bearer" prefix)',
    })
    .build();

  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, document);
};

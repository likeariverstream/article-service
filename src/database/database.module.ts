import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          username: configService.get<string>('POSTGRES_USERNAME'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          synchronize: false,
          logging: false,
          entitySkipConstructor: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

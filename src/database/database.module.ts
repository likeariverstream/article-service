import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import dataSource from '../config/datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

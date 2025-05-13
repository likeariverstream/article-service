import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [UsersModule, AppConfigModule],
})
export class AppModule {}

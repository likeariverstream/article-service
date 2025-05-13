import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [JwtModule, AppConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserData: CreateUserDto) {
    return this.usersService.create(createUserData);
  }

  @Post('login')
  login(@Body() loginUserData: LoginUserDto) {
    this.usersService.checkByEmailAndPassword(loginUserData);
  }

  @Post('logout')
  logout(@Body() logoutUserData: LogoutUserDto) {
    throw new Error(`Method not implemented ${logoutUserData.uuid}`);
  }
}

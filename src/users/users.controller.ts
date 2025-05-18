import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserData: CreateUserDto) {
    const existingUser = await this.usersService.checkByEmail(
      createUserData.email,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.createUser(createUserData);

    if (!user.uuid) {
      throw new UnprocessableEntityException('user uuid not found');
    }

    const { accessToken, refreshToken } = this.usersService.getTokenPair({
      email: user.email,
      uuid: user.uuid,
      name: user.name,
      surname: user.surname,
    });

    const updatedUser = await this.usersService.updateUser({
      ...user,
      refreshToken: refreshToken,
    });

    return {
      accessToken: accessToken,
      refreshToken: updatedUser?.refreshToken,
    };
  }

  @Post('login')
  async login(@Body() loginUserData: LoginUserDto) {
    const user = await this.usersService.checkByEmailAndPassword(loginUserData);
    if (!user.uuid) {
      throw new NotFoundException('non-existent email or password');
    }

    const { accessToken, refreshToken } = this.usersService.getTokenPair({
      email: user.email,
      uuid: user.uuid,
      name: user.name,
      surname: user.surname,
    });

    const updatedUser = await this.usersService.updateUser({
      ...user,
      refreshToken: refreshToken,
    });

    return {
      accessToken: accessToken,
      refreshToken: updatedUser?.refreshToken,
    };
  }
}

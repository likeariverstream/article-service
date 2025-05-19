import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';
import { LoginUserReqDto, LoginUserResDto } from './dto/login-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: CreateUserResDto, status: HttpStatus.CREATED })
  @Post('register')
  async register(
    @Body() createUserData: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    const existingUser = await this.usersService.checkByEmail(
      createUserData.email,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    return this.usersService.createUser(createUserData);
  }

  @ApiResponse({ type: LoginUserResDto, status: HttpStatus.CREATED })
  @Post('login')
  async login(
    @Body() loginUserData: LoginUserReqDto,
  ): Promise<LoginUserResDto> {
    const user = await this.usersService.checkByEmailAndPassword(loginUserData);
    if (!user?.uuid) {
      throw new NotFoundException('Non-existent email or password');
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

    if (!updatedUser?.refreshToken) {
      throw new NotFoundException('Refresh token not found');
    }

    return {
      accessToken: accessToken,
      refreshToken: updatedUser?.refreshToken,
    };
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }
    const [type, token] = authorization.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;

    if (!accessToken) {
      throw new UnauthorizedException('Bearer token is required');
    }

    const secret = this.configService.get<string>('AUTH_ACCESS_TOKEN_KEY');

    try {
      this.jwtService.verify(token, {
        secret,
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }
}

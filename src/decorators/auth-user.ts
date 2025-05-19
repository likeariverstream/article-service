import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Session } from '../components/users/interfaces/session';

interface DecodedToken extends Session {
  iat: number;
  exp: number;
}

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException('Token is invalid');
    }
    const decoded = jwt.decode(token) as DecodedToken;

    if (!decoded) {
      throw new UnauthorizedException('Token does not contain user data');
    }

    return {
      uuid: decoded.uuid,
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
    };
  },
);

import { Session } from './session';

interface TokenTime {
  iat: number;
  exp: number;
}

export interface TokenPayload extends TokenTime, Session {}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

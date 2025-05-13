import { createHmac } from 'node:crypto';
import * as process from 'node:process';

// TODO
const SECRET_AUTH_PASSWORD_KEY = process.env.SECRET_AUTH_PASSWORD_KEY || '';

const sha256 = (password: string) => {
  return createHmac('sha256', SECRET_AUTH_PASSWORD_KEY)
    .update(password)
    .digest('hex');
};

export { sha256 };

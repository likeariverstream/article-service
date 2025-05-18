import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ZodResponse {
  statusCode: number;
  error: string;
  message: string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus() || 500;
    const message = exception?.message || 'Internal server error';
    const zodResponse = exception?.getResponse() as ZodResponse;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      errors: zodResponse?.message,
    });
  }
}

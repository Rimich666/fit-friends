import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(Error)
export class AxiosExceptionFilter implements ExceptionFilter {
  makeMessage = (error: AxiosError) => {
    return {
      error: error.cause.message,
      url: error.config.url
    };
  };
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof AxiosError) {
      const error = exception as AxiosError;
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const statusText = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;
      const message = error.response ? error.response.data['message'] : this.makeMessage(error);
      delete error.response.data['message'];
      const data = error.response ? error.response.data : {};
      response
        .status(status)
        .json({
          statusCode: status,
          statusText,
          message,
          data
        });
      return;
    }
    const statusCode = exception.getStatus();
    if (statusCode === 400) {
      const errResponse = exception.getResponse();
      const statusText = errResponse['error'] || '';
      const message: string[] = [errResponse['message']] || [];
      response
        .status(statusCode)
        .json({
          statusCode,
          statusText,
          message,
        });
      return;
    }
    response
      .status(statusCode);
  }
}

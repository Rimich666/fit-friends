import {ConflictException} from '@nestjs/common';

export type LoggedUserExceptionPayLoad = {
  email: string,
  token: string
}

export class LoggedUserException extends ConflictException {
  constructor(payload: LoggedUserExceptionPayLoad) {
    super({
      message: `User: '${payload.email}' already logged.`,
      accessToken: payload.token
    });
  }
}

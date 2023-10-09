import {ConflictException} from '@nestjs/common';

export class NotYourAccountException extends ConflictException {
  constructor() {
    super(`You can only edit your account.`);
  }
}

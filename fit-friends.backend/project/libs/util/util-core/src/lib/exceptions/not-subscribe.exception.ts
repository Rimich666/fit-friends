import {BadRequestException} from '@nestjs/common';

export class NotSubscribeException extends BadRequestException {
  constructor(email: string, idCoach: string) {
    super(`User with email: ${email} is not subscribed to a trainer with id ${idCoach}`);
  }
}

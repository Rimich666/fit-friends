import {BadRequestException} from '@nestjs/common';

export class NotExistsTrainingException extends BadRequestException {
  constructor(idTraining: number) {
    super(`Training with id: ${idTraining} does not exists`);
  }
}

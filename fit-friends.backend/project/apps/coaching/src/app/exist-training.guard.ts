import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {TrainingService} from './training/training.service';
import {NotExistsTrainingException} from '@project/util-core';

@Injectable()
export class ExistTrainingGuard implements CanActivate {
  constructor(
    private trainingService: TrainingService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const trainingId = req.body['trainingId'];

    if (!(await this.trainingService.checkTraining(trainingId))) {
      throw new NotExistsTrainingException(trainingId);
    }

    return true;
  }
}

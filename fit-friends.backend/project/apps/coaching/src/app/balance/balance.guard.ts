import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  RequestMethod
} from '@nestjs/common';
import {NotExistsTrainingException} from '@project/util-core';
import {BalanceService} from './balance.service';
import {TrainingService} from '../training/training.service';

@Injectable()
export class BalanceGuard implements CanActivate {
  constructor(
    private balanceService: BalanceService,
    private trainingService: TrainingService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const trainingId = req.body['trainingId'];
    const userId = req.user.id;
    const error = req.method === RequestMethod[RequestMethod.POST] ?
      new NotExistsTrainingException(trainingId):
      new NotFoundException();

    const checked = req.method === RequestMethod[RequestMethod.POST] ?
    await this.trainingService.checkTraining(trainingId):
    await this.balanceService.checkBalance({trainingId, userId});

    if (!checked) {
      throw error;
    }

    return true;
  }
}

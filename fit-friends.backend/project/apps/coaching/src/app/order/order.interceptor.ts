import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {TrainingService} from '../training/training.service';
import {NotExistsTrainingException} from '@project/util-core';
import {PurchaseType} from '@project/shared-types';


@Injectable()
export class OrderInterceptor implements NestInterceptor{
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  async intercept(context:ExecutionContext, next:CallHandler): Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const trainingId = parseInt(body.trainingId, 10);
    const count = parseInt(body.count, 10) ?? 0;
    const training = await this.trainingService.getTrainingOrNull(trainingId);
    if (!training) {
      throw new NotExistsTrainingException(trainingId);
    }
    body.purchaseType = PurchaseType.membership;
    body.price = training.price;
    body.createDate = new Date();
    body.total = training.price * count;
    return next.handle();
  }
}

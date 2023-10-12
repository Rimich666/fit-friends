import {OrderInterface, TrainingInterface} from '@project/shared-types';
import {BalanceInterface} from '@project/shared-types';

export class BalanceEntity implements BalanceInterface {
  public id: number;
  public userId: string;
  public trainingId: number;
  public count: number;

  constructor(training: TrainingInterface) {
    this.fillEntity(training);
  }

  public fillEntity(order: OrderInterface) {
    this.id = order.id;
    this.userId = order.userId;
    this.trainingId = order.trainingId;
    this.count = order.count;
  }

  public toObject() {
    const {id, ...item} = this;
    return { ...item};
  }
}

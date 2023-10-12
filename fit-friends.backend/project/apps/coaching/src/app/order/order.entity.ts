import {OrderInterface, TrainingInterface} from '@project/shared-types';
import {instanceToPlain} from 'class-transformer';

export class OrderEntity implements OrderInterface {
  public id: number;
  public userId: string;
  public purchaseType: string;
  public trainingId: number;
  public price: number;
  public count: number;
  public total: number;
  public paymentOption: string;
  public createDate: Date;

  constructor(training: TrainingInterface) {
    this.fillEntity(training);
  }

  public fillEntity(order: OrderInterface) {
    this.id = order.id;
    this.userId = order.userId;
    this.purchaseType = order.purchaseType;
    this.trainingId = order.trainingId;
    this.price = order.price;
    this.count = order.count;
    this.total = order.total;
    this.paymentOption = order.paymentOption;
    this.createDate = order.createDate;
  }

  public toObject() {
    const {id, ...item} = this;
    return { ...item};
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }
}

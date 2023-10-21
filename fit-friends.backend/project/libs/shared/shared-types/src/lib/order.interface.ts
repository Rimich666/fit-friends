import {TrainingInterface} from './training.Interface';

export interface OrderInterface {
  id?: number;
  userId?: string;
  purchaseType?: string;
  trainingId?: number;
  price?: number;
  count?: number;
  total?: number;
  paymentOption?: string;
  createDate?: Date;
  training?: TrainingInterface;
}

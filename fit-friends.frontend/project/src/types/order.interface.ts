import {TrainingInterface} from './training.interface';

export interface OrderInterface {
  id: number;
  training: TrainingInterface;
  purchaseType: string;
  trainingId: number;
  price: number;
  count: number;
  total: number;
  paymentOption: string;
}

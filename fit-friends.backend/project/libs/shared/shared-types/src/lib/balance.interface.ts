import {TrainingInterface} from './training.Interface';

export interface BalanceInterface {
  id?: number,
  userId: string,
  training?: TrainingInterface,
  trainingId: number,
  count?: number
}

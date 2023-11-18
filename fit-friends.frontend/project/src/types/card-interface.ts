import {TrainingType} from '../enums';

export interface CardInterface {
  id: number;
  src: string;
  price: number;
  name: string;
  type: TrainingType;
  caloriesCount: number;
  description: string;
  rating: number;
}


export interface MyOrderInterface extends CardInterface {
  count: number;
  total: number;
}

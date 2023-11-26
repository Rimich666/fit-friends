import {TrainingInterface} from "./training.interface";

export interface OrderRdo {
  name: string;
  backgroundPath: string;
  level: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesCount: number;
  description: string;
  gender: string;
  videoId: string;
  rating: number;
  coachId: string;
  spec: boolean;
  createDate: Date;
  orderId: number;
  count: number;
  total: number;
  trainingId: number;
}

export interface GetOrdersInterface {
  data: OrderRdo[];
  pages: number;
}

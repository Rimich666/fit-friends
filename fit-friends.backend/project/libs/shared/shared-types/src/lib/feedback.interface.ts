import {TrainingInterface} from './training.Interface';

export interface FeedbackInterface {
  id?: number;
  authorId?: string;
  trainingId?: number;
  rating?: number;
  text?: string;
  createDate?: Date;
  training?: TrainingInterface
}

import {UserInterface} from './user.interface';

export interface FeedbackInterface {
  id: number;
  author: UserInterface;
  authorId: string;
  trainingId: number;
  rating: number;
  text: string;
  createDate: Date;
}

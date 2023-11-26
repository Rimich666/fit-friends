import {UserInterface} from './user.interface';

export interface TrainingInterface {
  id: number;
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
  videoPath: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
  createDate: Date;
  coach?: UserInterface;
}

export interface GetTrainingsInterface {
  data: TrainingInterface[];
  maxPrice?: number;
  pages: number;
}

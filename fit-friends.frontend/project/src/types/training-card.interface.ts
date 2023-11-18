import {Gender, TrainingTime, TrainingType} from '../enums';

export interface TrainingCardInterface {
  coach: {
    name: string;
    avatar: string;
  };
  id: number;
  name: string;
  description: string;
  rating: number;
  type: TrainingType;
  gender: Gender;
  caloriesCount: number;
  time: TrainingTime;
  price: number;
  isSpecialOffer: boolean;
  videoPath: string;
  backgroundPath: string;
}

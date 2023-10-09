import {TrainingTime, TrainingType, Gender, Level} from './enums';

export interface TrainingInterface {
  id?: string;
  name?: string;
  level?: Level;
  trainingType?: TrainingType;
  trainingTime?: TrainingTime;
  price?: number
  trainingCalories?: number;
  description?: string;
  gender: Gender;
  videoId: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
}

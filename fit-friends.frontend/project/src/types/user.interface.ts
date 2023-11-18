import {Gender, Level, Role, TrainingTime, TrainingType, UserLocation} from '../enums';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  location: UserLocation;
  avatarPath: string;
  role: Role;
  description: string;
  createDate: Date;
  level: Level;
  trainingType: TrainingType[];
  isReady: boolean;
  certificate?: string[];
  merits?: string;
  trainingTime?: TrainingTime;
  trainingCalories?: number;
  daysCalories?: number;
}

import {TrainingTime, TrainingType, Gender, Level, Role, UserLocation} from './enums';

export type CoachAddition = {
  certificateId?: string[];
  merits?: string;
}

export type SportsmanAddition = {
  trainingTime?: TrainingTime;
  trainingCalories?: number;
  daysCalories?: number;
}

export type Addition = CoachAddition | SportsmanAddition | Map<string, string | number>;

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  avatarId?: string;
  password?: string;
  gender?: Gender;
  birthDate?: Date;
  role?: Role;
  description?: string;
  location?: UserLocation;
  imagePath?: string;
  createDate?: Date;
  level?: Level;
  trainingType?: TrainingType[];
  isReady?: boolean;
  addition?: Addition;
}
